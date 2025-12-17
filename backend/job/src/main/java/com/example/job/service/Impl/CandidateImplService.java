package com.example.job.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.job.dao.CandidateDAO;
import com.example.job.entity.Candidate;
import com.example.job.service.CandidateService;
import com.example.job.service.search.SearchSyncService;
import com.example.job.util.IDGenerator;

@Service
public class CandidateImplService implements CandidateService {

    @Autowired
    private CandidateDAO candidateDAO;

    @Autowired
    private IDGenerator idGenerator;

    @Autowired
    private SearchSyncService searchSyncService;

    @Override
    public List<Candidate> getAllCandidates() throws Exception {
        return this.candidateDAO.findAll();
    }

    @Override
    public Candidate createCandidate(Candidate candidate) throws Exception {
        try {
            if(candidate.getCandidateID() == null || candidate.getCandidateID().isEmpty()) {
                String candidateID = idGenerator.generateID(IDGenerator.EntityType.CANDIDATE);
                candidate.setCandidateID(candidateID);
            }
            Candidate savedCandidate = this.candidateDAO.save(candidate);
            try {
                searchSyncService.syncCandidate(savedCandidate);
            } catch (Exception e) {
                System.err.println("Failed to sync candidate to search index: " + e.getMessage());
            }
            
            return savedCandidate;
        } catch (Exception e) {
            throw new Exception("Failed to create candidate: " + e.getMessage(), e);
        }
    }

    @Override
    public Candidate updateCandidate(String id, Candidate candidate) throws Exception {
        try {
            Candidate updatedCandidate = this.candidateDAO.save(candidate);
            try {
                searchSyncService.syncCandidate(updatedCandidate);
            } catch (Exception e) {
                System.err.println("Failed to sync updated candidate to search index: " + e.getMessage());
            }
            
            return updatedCandidate;
        } catch (Exception e) {
            throw new Exception("Failed to update candidate: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteCandidate(String id) throws Exception {
        try {
            this.candidateDAO.deleteById(id);
            try {
                searchSyncService.deleteCandidateFromSearch(id);
            } catch (Exception e) {
                System.err.println("Failed to delete candidate from search index: " + e.getMessage());
            }
        } catch (Exception e) {
            throw new Exception("Failed to delete candidate: " + e.getMessage(), e);
        }
    }

    @Override
    public Candidate getCandidateByCandidateID(String candidateID) throws Exception {
        return this.candidateDAO.findByCandidateID(candidateID);
    }
}
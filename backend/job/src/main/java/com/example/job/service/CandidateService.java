package com.example.job.service;

import java.util.List;

import com.example.job.entity.Candidate;

public interface CandidateService {
    List<Candidate> getAllCandidates() throws Exception;
    Candidate createCandidate(Candidate candidate) throws Exception;
    Candidate updateCandidate(String id, Candidate candidate) throws Exception;
    void deleteCandidate(String id) throws Exception;
    Candidate getCandidateByCandidateID(String candidateID) throws Exception;
}

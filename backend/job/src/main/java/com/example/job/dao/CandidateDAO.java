package com.example.job.dao;

import java.util.List;

import com.example.job.entity.Candidate;

public interface CandidateDAO {
    List<Candidate> findAll() throws Exception;
    Candidate save(Candidate candidate) throws Exception;
    void deleteById(String id) throws Exception;
    long getCandidateCount() throws Exception;
    Candidate findByCandidateID(String candidateID) throws Exception;
}

package com.example.job.dao.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.job.dao.CandidateDAO;
import com.example.job.entity.Candidate;

@Repository
public class CandidateImplDAO implements CandidateDAO {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Candidate> findAll() throws Exception {
        try {
            return mongoTemplate.findAll(Candidate.class);
        } catch (Exception e) {
            throw new Exception("Failed to find all candidates: " + e.getMessage());
        }
    }

    @Override
    public Candidate save(Candidate candidate) throws Exception {
        try {
            return mongoTemplate.save(candidate);
        } catch (Exception e) {
            throw new Exception("Failed to save candidate: " + e.getMessage());
        }
    }

    @Override
    public void deleteById(String id) throws Exception {
        try {
            Query query = new Query(Criteria.where("id").is(id));
            mongoTemplate.remove(query, Candidate.class);
        } catch (Exception e) {
            throw new Exception("Failed to delete candidate: " + e.getMessage());
        }
    }

    @Override
    public long getCandidateCount() throws Exception {
        try {
            return mongoTemplate.count(new Query(), Candidate.class);
        } catch (Exception e) {
            throw new Exception("Failed to get candidate count: " + e.getMessage());
        }
    }

    @Override
    public Candidate findByCandidateID(String candidateID) throws Exception {
        try {
            Query query = new Query(Criteria.where("candidateID").is(candidateID));
            return mongoTemplate.findOne(query, Candidate.class);
        } catch (Exception e) {
            throw new Exception("Failed to find candidate by candidateID: " + e.getMessage());
        }
    }
}
package com.example.job.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.job.dao.CandidateDAO;
import com.example.job.dao.VacancyDAO;

@Component
public class IDGenerator {

    @Autowired
    private CandidateDAO candidateDAO;

    @Autowired
    private VacancyDAO vacancyDAO;

    private static final String CANDIDATE_PREFIX = "CAN";
    private static final String JOB_PREFIX = "JOB";
    private static final int MIN_ID_LENGTH = 3;

    public enum EntityType {
        CANDIDATE, VACANCY
    }

    public String generateID(EntityType type) throws Exception {
        String prefix = type == EntityType.CANDIDATE ? CANDIDATE_PREFIX : JOB_PREFIX;
        long count = type == EntityType.CANDIDATE ? 
            candidateDAO.getCandidateCount() : 
            vacancyDAO.getVacancyCount();
        
        String generatedID;
        do {
            count++;
            int requiredLength = Math.max(MIN_ID_LENGTH, String.valueOf(count).length());
            generatedID = prefix + String.format("%0" + requiredLength + "d", count);
        } while (exists(generatedID, type));
        
        return generatedID;
    }

    private boolean exists(String id, EntityType type) throws Exception {
        return type == EntityType.CANDIDATE ? 
            candidateDAO.findByCandidateID(id) != null : 
            vacancyDAO.findByVacancyID(id) != null;
    }
}
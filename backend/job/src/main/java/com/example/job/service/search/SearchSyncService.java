package com.example.job.service.search;

import com.example.job.entity.Candidate;
import com.example.job.entity.Vacancy;
import java.util.concurrent.CompletableFuture;

public interface SearchSyncService {
    
    CompletableFuture<Void> syncAllDataAsync();
    
    void syncAllCandidates();
    
    void syncAllVacancies();
    
    void syncCandidate(Candidate candidate);
    
    void syncVacancy(Vacancy vacancy);
    
    void deleteCandidateFromSearch(String candidateId);
    
    void deleteVacancyFromSearch(String vacancyId);

}
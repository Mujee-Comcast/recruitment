package com.example.job.service.search;

import com.example.job.dao.CandidateDAO;
import com.example.job.dao.VacancyDAO;
import com.example.job.entity.Candidate;
import com.example.job.entity.Vacancy;
import com.example.job.entity.search.CandidateDocument;
import com.example.job.entity.search.VacancyDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class SearchSyncImplService implements SearchSyncService {

    @Autowired
    private SearchService searchService;

    @Autowired
    private CandidateDAO candidateDAO;

    @Autowired
    private VacancyDAO vacancyDAO;

    @Async
    public CompletableFuture<Void> syncAllDataAsync() {
        try {
            syncAllCandidates();
            syncAllVacancies();
            return CompletableFuture.completedFuture(null);
        } catch (Exception e) {
            return CompletableFuture.failedFuture(e);
        }
    }

    public void syncAllCandidates() {
        try {
            List<Candidate> candidates = candidateDAO.findAll();
            for (Candidate candidate : candidates) {
                syncCandidate(candidate);
            }
            System.out.println("Synced " + candidates.size() + " candidates to search index");
        } catch (Exception e) {
            System.err.println("Failed to sync candidates: " + e.getMessage());
        }
    }

    public void syncAllVacancies() {
        try {
            List<Vacancy> vacancies = vacancyDAO.findAll();
            for (Vacancy vacancy : vacancies) {
                syncVacancy(vacancy);
            }
            System.out.println("Synced " + vacancies.size() + " vacancies to search index");
        } catch (Exception e) {
            System.err.println("Failed to sync vacancies: " + e.getMessage());
        }
    }

    public void syncCandidate(Candidate candidate) {
        try {
            CandidateDocument document = CandidateDocument.fromCandidate(candidate);
            searchService.indexCandidate(document);
        } catch (Exception e) {
            System.err.println("Failed to sync candidate " + candidate.getCandidateID() + ": " + e.getMessage());
        }
    }

    public void syncVacancy(Vacancy vacancy) {
        try {
            VacancyDocument document = VacancyDocument.fromVacancy(vacancy);
            searchService.indexVacancy(document);
        } catch (Exception e) {
            System.err.println("Failed to sync vacancy " + vacancy.getVacancyID() + ": " + e.getMessage());
        }
    }

    public void deleteCandidateFromSearch(String candidateId) {
        try {
            searchService.deleteCandidateById(candidateId);
        } catch (Exception e) {
            System.err.println("Failed to delete candidate from search: " + e.getMessage());
        }
    }

    public void deleteVacancyFromSearch(String vacancyId) {
        try {
            searchService.deleteVacancyById(vacancyId);
        } catch (Exception e) {
            System.err.println("Failed to delete vacancy from search: " + e.getMessage());
        }
    }

}
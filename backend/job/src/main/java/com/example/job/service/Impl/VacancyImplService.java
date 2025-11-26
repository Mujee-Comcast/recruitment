package com.example.job.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.job.dao.VacancyDAO;
import com.example.job.entity.Vacancy;
import com.example.job.service.VacancyService;
import com.example.job.service.search.SearchSyncService;
import com.example.job.util.IDGenerator;

@Service
public class VacancyImplService implements VacancyService {

    @Autowired
    private VacancyDAO vacancyDAO;

    @Autowired
    private IDGenerator idGenerator;

    @Autowired
    private SearchSyncService searchSyncService;

    @Override
    public List<Vacancy> searchVacancies(String keyword) throws Exception {
        return vacancyDAO.searchVacancies(keyword);
    }

    @Override
    public Vacancy createVacancy(Vacancy vacancy) throws Exception {
        String vacancyID = idGenerator.generateID(IDGenerator.EntityType.VACANCY);
        vacancy.setVacancyID(vacancyID);
        
        try {
            Vacancy savedVacancy = vacancyDAO.createVacancy(vacancy);
            try {
                searchSyncService.syncVacancy(savedVacancy);
            } catch (Exception e) {
                System.err.println("Failed to sync vacancy to search index: " + e.getMessage());
            }
            
            return savedVacancy;
        } catch (Exception e) {
            throw new Exception("Failed to create vacancy: " + e.getMessage(), e);
        }
    }

    @Override
    public Vacancy getVacancyByVacancyID(String vacancyID) throws Exception {
        return vacancyDAO.findByVacancyID(vacancyID);
    }

    @Override
    public List<Vacancy> getAllVacancies() throws Exception {
        return vacancyDAO.findAll();
    }

    @Override
    public Vacancy updateVacancy(Vacancy vacancy) throws Exception {
        try {
            Vacancy updatedVacancy = vacancyDAO.updateVacancy(vacancy);
            try {
                searchSyncService.syncVacancy(updatedVacancy);
            } catch (Exception e) {
                System.err.println("Failed to sync updated vacancy to search index: " + e.getMessage());
            }
            
            return updatedVacancy;
        } catch (Exception e) {
            throw new Exception("Failed to update vacancy: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteVacancy(String id) throws Exception {
        try {
            vacancyDAO.deleteVacancy(id);
            try {
                searchSyncService.deleteVacancyFromSearch(id);
            } catch (Exception e) {
                System.err.println("Failed to delete vacancy from search index: " + e.getMessage());
            }
        } catch (Exception e) {
            throw new Exception("Failed to delete vacancy: " + e.getMessage(), e);
        }
    }

    @Override
    public long getVacancyCount() throws Exception {
        return vacancyDAO.getVacancyCount();
    }
}
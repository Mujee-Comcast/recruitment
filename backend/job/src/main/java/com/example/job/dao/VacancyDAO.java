package com.example.job.dao;

import java.util.List;

import com.example.job.entity.Vacancy;

public interface VacancyDAO {
    List<Vacancy> searchVacancies(String keyword) throws Exception;
    Vacancy createVacancy(Vacancy vacancy) throws Exception;
    Vacancy findByVacancyID(String vacancyID) throws Exception;
    List<Vacancy> findAll() throws Exception;
    Vacancy updateVacancy(Vacancy vacancy) throws Exception;
    void deleteVacancy(String id) throws Exception;
    long getVacancyCount() throws Exception;
}

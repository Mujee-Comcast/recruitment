package com.example.job.service;

import com.example.job.entity.Vacancy;

import java.util.List;

public interface VacancyService {
    List<Vacancy> searchVacancies(String keyword) throws Exception;
    Vacancy createVacancy(Vacancy vacancy) throws Exception;
    Vacancy getVacancyByVacancyID(String vacancyID) throws Exception;
    List<Vacancy> getAllVacancies() throws Exception;
    Vacancy updateVacancy(Vacancy vacancy) throws Exception;
    void deleteVacancy(String id) throws Exception;
    long getVacancyCount() throws Exception;
}

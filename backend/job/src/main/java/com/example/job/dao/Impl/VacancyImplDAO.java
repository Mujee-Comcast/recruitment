package com.example.job.dao.Impl;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.job.dao.VacancyDAO;
import com.example.job.entity.Vacancy;

@Repository
public class VacancyImplDAO implements VacancyDAO {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Vacancy> searchVacancies(String keyword) throws Exception {
        try {
            if (keyword == null || keyword.trim().isEmpty()) {
                return mongoTemplate.findAll(Vacancy.class);
            }

            Pattern pattern = Pattern.compile(keyword, Pattern.CASE_INSENSITIVE);

            Query query = new Query();
            query.addCriteria(
                    new Criteria().orOperator(
                            Criteria.where("title").regex(pattern),
                            Criteria.where("description").regex(pattern),
                            Criteria.where("level").regex(pattern),
                            Criteria.where("recruiter").regex(pattern),
                            Criteria.where("primarySkills").regex(pattern),
                            Criteria.where("secondarySkills").regex(pattern)));
            return mongoTemplate.find(query, Vacancy.class);
        } catch (Exception e) {
            throw new Exception("Failed to search vacancies: " + e.getMessage());
        }
    }

    @Override
    public Vacancy createVacancy(Vacancy vacancy) throws Exception {
        try {
            return mongoTemplate.save(vacancy);
        } catch (Exception e) {
            throw new Exception("Failed to create vacancy: " + e.getMessage());
        }
    }

    @Override
    public Vacancy findByVacancyID(String vacancyID) throws Exception {
        try {
            Query query = new Query(Criteria.where("vacancyID").is(vacancyID));
            return mongoTemplate.findOne(query, Vacancy.class);
        } catch (Exception e) {
            throw new Exception("Failed to find vacancy by vacancyID: " + e.getMessage());
        }
    }

    @Override
    public List<Vacancy> findAll() throws Exception {
        try {
            return mongoTemplate.findAll(Vacancy.class);
        } catch (Exception e) {
            throw new Exception("Failed to find all vacancies: " + e.getMessage());
        }
    }

    @Override
    public void deleteVacancy(String id) throws Exception {
        try {
            Query query = new Query(Criteria.where("id").is(id));
            mongoTemplate.remove(query, Vacancy.class);
        } catch (Exception e) {
            throw new Exception("Failed to delete vacancy: " + e.getMessage());
        }
    }

    @Override
    public Vacancy updateVacancy(Vacancy vacancy) throws Exception {
        try {
            return mongoTemplate.save(vacancy);
        } catch (Exception e) {
            throw new Exception("Failed to update vacancy: " + e.getMessage());
        }
    }

    @Override
    public long getVacancyCount() throws Exception {
        try {
            return mongoTemplate.count(new Query(), Vacancy.class);
        } catch (Exception e) {
            throw new Exception("Failed to get vacancy count: " + e.getMessage());
        }
    }
}
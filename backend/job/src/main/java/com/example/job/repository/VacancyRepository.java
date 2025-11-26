// package com.example.job.repository;

// import com.example.job.entity.Vacancy;
// import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.mongodb.repository.Query;
// import org.springframework.stereotype.Repository;

// import java.util.List;

// @Repository
// public interface VacancyRepository extends MongoRepository<Vacancy, String> {
    
//     // Custom query methods for searching vacancies
    
//     @Query("{'title': {$regex: ?0, $options: 'i'}}")
//     List<Vacancy> findByTitleContainingIgnoreCase(String title);
    
//     @Query("{'description': {$regex: ?0, $options: 'i'}}")
//     List<Vacancy> findByDescriptionContainingIgnoreCase(String description);
    
//     @Query("{'level': ?0}")
//     List<Vacancy> findByLevel(String level);
    
//     @Query("{'recruiter': {$regex: ?0, $options: 'i'}}")
//     List<Vacancy> findByRecruiterContainingIgnoreCase(String recruiter);
    
//     @Query("{'primarySkills': {$in: [?0]}}")
//     List<Vacancy> findByPrimarySkillsContaining(String skill);
    
//     @Query("{'secondarySkills': {$in: [?0]}}")
//     List<Vacancy> findBySecondarySkillsContaining(String skill);
    
//     // Complex search query that searches across multiple fields
//     @Query("{$or: [" +
//            "{'title': {$regex: ?0, $options: 'i'}}," +
//            "{'description': {$regex: ?0, $options: 'i'}}," +
//            "{'level': {$regex: ?0, $options: 'i'}}," +
//            "{'recruiter': {$regex: ?0, $options: 'i'}}," +
//            "{'primarySkills': {$regex: ?0, $options: 'i'}}," +
//            "{'secondarySkills': {$regex: ?0, $options: 'i'}}" +
//            "]}")
//     List<Vacancy> searchVacanciesByKeyword(String keyword);
    
//     // Find vacancies by experience range
//     @Query("{'experience': {$gte: ?0, $lte: ?1}}")
//     List<Vacancy> findByExperienceBetween(Integer minExp, Integer maxExp);
    
//     // Find vacancies with open positions
//     @Query("{'openPositions': {$gt: 0}}")
//     List<Vacancy> findVacanciesWithOpenPositions();
// }
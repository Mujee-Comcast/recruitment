package com.example.job.entity.search;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.example.job.entity.Vacancy;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VacancyDocument {

    private String id;
    private String vacancyID;
    private String title;
    private String description;
    private String level;
    private Integer experience;
    private Integer openPositions;
    private String recruiter;
    private List<String> primarySkills;
    private List<String> secondarySkills;

    private String allSkills;
    private String searchableContent;

    public static VacancyDocument fromVacancy(Vacancy vacancy) {
        VacancyDocument doc = new VacancyDocument();
        doc.setId(vacancy.getId());
        doc.setVacancyID(vacancy.getVacancyID());
        doc.setTitle(vacancy.getTitle());
        doc.setDescription(vacancy.getDescription());
        doc.setLevel(vacancy.getLevel());
        doc.setExperience(vacancy.getExperience());
        doc.setOpenPositions(vacancy.getOpenPositions());
        doc.setRecruiter(vacancy.getRecruiter());
        doc.setPrimarySkills(vacancy.getPrimarySkills());
        doc.setSecondarySkills(vacancy.getSecondarySkills());

        StringBuilder allSkills = new StringBuilder();
        if (vacancy.getPrimarySkills() != null) {
            allSkills.append(String.join(" ", vacancy.getPrimarySkills())).append(" ");
        }
        if (vacancy.getSecondarySkills() != null) {
            allSkills.append(String.join(" ", vacancy.getSecondarySkills()));
        }
        doc.setAllSkills(allSkills.toString().trim());

        StringBuilder searchableContent = new StringBuilder();
        searchableContent.append(vacancy.getTitle()).append(" ");
        searchableContent.append(vacancy.getDescription()).append(" ");
        searchableContent.append(vacancy.getLevel()).append(" ");
        searchableContent.append(vacancy.getRecruiter()).append(" ");
        searchableContent.append(doc.getAllSkills()).append(" ");
        searchableContent.append("experience ").append(vacancy.getExperience()).append(" years");
        doc.setSearchableContent(searchableContent.toString().trim());

        return doc;
    }
}
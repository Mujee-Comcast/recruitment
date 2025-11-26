package com.example.job.entity.search;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.example.job.entity.Candidate;
import com.example.job.entity.Education;
import com.example.job.entity.Experience;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateDocument {

    private String id;
    private String candidateID;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String role;
    private String totalExperience;
    private String summary;
    private List<String> primarySkills;
    private List<String> secondarySkills;
    private List<String> certifications;
    private String resumeLink;

    private List<ExperienceDocument> experience;
    private List<EducationDocument> education;

    private String fullName;
    private String allSkills;
    private String searchableContent;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ExperienceDocument {
        private String company;
        private String position;
        private Boolean isCurrent;
        private String startDate;
        private String endDate;
        private String responsibilities;
        
        public static ExperienceDocument fromExperience(Experience exp) {
            return new ExperienceDocument(
                exp.getCompany(),
                exp.getPosition(),
                exp.getIsCurrent(),
                exp.getStartDate(),
                exp.getEndDate(),
                exp.getResponsibilities()
            );
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class EducationDocument {
        private String institution;
        private String degree;
        private String fieldOfStudy;
        private String graduationYear;
        private String grade;
        
        public static EducationDocument fromEducation(Education edu) {
            return new EducationDocument(
                edu.getInstitution(),
                edu.getDegree(),
                edu.getFieldOfStudy(),
                edu.getGraduationYear(),
                edu.getGrade()
            );
        }
    }

    public static CandidateDocument fromCandidate(Candidate candidate) {
        CandidateDocument doc = new CandidateDocument();
        doc.setId(candidate.getId());
        doc.setCandidateID(candidate.getCandidateID());
        doc.setFirstName(candidate.getFirstName());
        doc.setLastName(candidate.getLastName());
        doc.setEmail(candidate.getEmail());
        doc.setMobile(candidate.getMobile());
        doc.setRole(candidate.getRole());
        doc.setTotalExperience(candidate.getTotalExperience());
        doc.setSummary(candidate.getSummary());
        doc.setPrimarySkills(candidate.getPrimarySkills());
        doc.setSecondarySkills(candidate.getSecondarySkills());
        doc.setCertifications(candidate.getCertifications());
        doc.setResumeLink(candidate.getResumeLink());

        if (candidate.getEducation() != null) {
            doc.setEducation(candidate.getEducation().stream()
                .map(EducationDocument::fromEducation)
                .toList());
        }

        if (candidate.getExperience() != null) {
            doc.setExperience(candidate.getExperience().stream()
                .map(ExperienceDocument::fromExperience)
                .toList());
        }

        doc.setFullName(candidate.getFirstName() + " " + candidate.getLastName());
        
        StringBuilder allSkills = new StringBuilder();
        if (candidate.getPrimarySkills() != null) {
            allSkills.append(String.join(" ", candidate.getPrimarySkills())).append(" ");
        }
        if (candidate.getSecondarySkills() != null) {
            allSkills.append(String.join(" ", candidate.getSecondarySkills()));
        }
        doc.setAllSkills(allSkills.toString().trim());

        StringBuilder searchableContent = new StringBuilder();
        searchableContent.append(candidate.getCandidateID()).append(" ");
        searchableContent.append(doc.getFullName()).append(" ");
        searchableContent.append(candidate.getRole()).append(" ");
        searchableContent.append(candidate.getSummary()).append(" ");
        searchableContent.append(doc.getAllSkills()).append(" ");

        if (doc.getEducation() != null) {
            doc.getEducation().forEach(edu -> {
                searchableContent.append(edu.getInstitution()).append(" ");
                searchableContent.append(edu.getDegree()).append(" ");
                searchableContent.append(edu.getFieldOfStudy()).append(" ");
            });
        }

        if (doc.getExperience() != null) {
            doc.getExperience().forEach(exp -> {
                searchableContent.append(exp.getCompany()).append(" ");
                searchableContent.append(exp.getPosition()).append(" ");
                if (exp.getResponsibilities() != null) {
                    searchableContent.append(exp.getResponsibilities()).append(" ");
                }
            });
        }
        
        doc.setSearchableContent(searchableContent.toString().trim());

        return doc;
    }
}
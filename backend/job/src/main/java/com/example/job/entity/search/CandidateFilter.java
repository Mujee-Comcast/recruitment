package com.example.job.entity.search;

import java.util.List;

public class CandidateFilter {
    private String candidateId;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String role;
    private String totalExperience;
    private List<String> primarySkills;
    private List<String> secondarySkills;
    private String summary;
    private List<String> certifications;
    private String resumeLink;
    private String experienceCompany;
    private String experiencePosition;
    private String experienceStartDate;
    private String experienceEndDate;
    private String educationInstitution;
    private String educationDegree;
    private String educationFieldOfStudy;
    private String educationGraduationYear;

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTotalExperience() {
        return totalExperience;
    }

    public void setTotalExperience(String totalExperience) {
        this.totalExperience = totalExperience;
    }

    public List<String> getPrimarySkills() {
        return primarySkills;
    }

    public void setPrimarySkills(List<String> primarySkills) {
        this.primarySkills = primarySkills;
    }

    public List<String> getSecondarySkills() {
        return secondarySkills;
    }

    public void setSecondarySkills(List<String> secondarySkills) {
        this.secondarySkills = secondarySkills;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<String> certifications) {
        this.certifications = certifications;
    }

    public String getResumeLink() {
        return resumeLink;
    }

    public void setResumeLink(String resumeLink) {
        this.resumeLink = resumeLink;
    }

    public String getExperienceCompany() {
        return experienceCompany;
    }

    public void setExperienceCompany(String experienceCompany) {
        this.experienceCompany = experienceCompany;
    }

    public String getExperiencePosition() {
        return experiencePosition;
    }

    public void setExperiencePosition(String experiencePosition) {
        this.experiencePosition = experiencePosition;
    }

    public String getExperienceStartDate() {
        return experienceStartDate;
    }

    public void setExperienceStartDate(String experienceStartDate) {
        this.experienceStartDate = experienceStartDate;
    }

    public String getExperienceEndDate() {
        return experienceEndDate;
    }

    public void setExperienceEndDate(String experienceEndDate) {
        this.experienceEndDate = experienceEndDate;
    }

    public String getEducationInstitution() {
        return educationInstitution;
    }

    public void setEducationInstitution(String educationInstitution) {
        this.educationInstitution = educationInstitution;
    }

    public String getEducationDegree() {
        return educationDegree;
    }

    public void setEducationDegree(String educationDegree) {
        this.educationDegree = educationDegree;
    }

    public String getEducationFieldOfStudy() {
        return educationFieldOfStudy;
    }

    public void setEducationFieldOfStudy(String educationFieldOfStudy) {
        this.educationFieldOfStudy = educationFieldOfStudy;
    }

    public String getEducationGraduationYear() {
        return educationGraduationYear;
    }

    public void setEducationGraduationYear(String educationGraduationYear) {
        this.educationGraduationYear = educationGraduationYear;
    }

    public String getName() {
        if (firstName != null && lastName != null) {
            return firstName + " " + lastName;
        } else if (firstName != null) {
            return firstName;
        } else if (lastName != null) {
            return lastName;
        }
        return null;
    }
}

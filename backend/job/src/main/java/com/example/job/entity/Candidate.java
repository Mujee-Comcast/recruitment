package com.example.job.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "candidate")
public class Candidate extends Audit {
    @Id
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id;

    @Field("candidateID")
    private String candidateID;

    @Field("firstName")
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @Field("lastName")
    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Field("email")
    @NotBlank(message = "Email is mandatory")
    private String email;

    @Field("mobile")
    @NotBlank(message = "Mobile number is mandatory")
    private String mobile;

    @Field("role")
    @NotBlank(message = "Role is mandatory")
    private String role;

    @Field("totalExperience")
    @NotBlank(message = "Experience is mandatory")
    @Min(value = 0, message = "Experience must be 0 or greater")
    private String totalExperience;

    @Field("experience")
    @NotEmpty(message = "Experience details are mandatory")
    private List<Experience> experience;

    @Field("summary")
    @NotBlank(message = "Summary is mandatory")
    private String summary;

    @Field("primarySkills")
    @NotEmpty(message = "Primary skills are mandatory")
    private List<String> primarySkills;

    @Field("secondarySkills")
    private List<String> secondarySkills;

    @Field("education")
    @NotEmpty(message = "Education is mandatory")
    private List<Education> education;

    @Field("certifications")
    private List<String> certifications;

    @Field("resumeLink")
    @NotBlank(message = "Resume link is mandatory")
    private String resumeLink;
}

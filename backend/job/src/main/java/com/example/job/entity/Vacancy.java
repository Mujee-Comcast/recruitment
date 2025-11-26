package com.example.job.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "vacancy")
@JsonIgnoreProperties(ignoreUnknown = false)
public class Vacancy extends Audit {

    @Id
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id;

    @Field("vacancyID")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String vacancyID;

    @Field("title")
    @NotBlank(message = "Title is mandatory")
    private String title;
    
    @Field("description")
    @NotBlank(message = "Description is mandatory")
    private String description;
    
    @Field("level")
    @NotBlank(message = "Level is mandatory")
    private String level;
    
    @Field("experience")
    @NotNull(message = "Experience cannot be null")
    @Min(value = 0, message = "Experience must be 0 or greater")
    private Integer experience;
    
    @Field("openPositions")
    @NotNull(message = "Open positions cannot be null")
    @Min(value = 1, message = "Open positions must be at least 1")
    private Integer openPositions;
    
    @Field("recruiter")
    @NotBlank(message = "Recruiter is mandatory")
    private String recruiter;
    
    @Field("primarySkills")
    @NotEmpty(message = "Primary skills are mandatory")
    private List<String> primarySkills;
    
    @Field("secondarySkills")
    private List<String> secondarySkills;

}

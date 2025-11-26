package com.example.job.entity;

import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Education {

    @Field(name = "institution")
    private String institution;

    @Field(name = "degree")
    private String degree;

    @Field(name = "fieldOfStudy")
    private String fieldOfStudy;

    @Field(name = "graduationYear")
    private String graduationYear;

    @Field(name = "grade")
    private String grade;

}

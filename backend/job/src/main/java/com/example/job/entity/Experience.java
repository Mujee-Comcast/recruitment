package com.example.job.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
public class Experience {

    @Field(name = "company")
    @NotBlank(message = "Company name is mandatory")
    private String company;

    @Field(name = "position")
    @NotBlank(message = "Position is mandatory")
    private String position;

    @Field(name = "isCurrent")
    private Boolean isCurrent;

    @Field(name = "startDate")
    @NotBlank(message = "Start date is mandatory")
    private String startDate;

    @Field(name = "endDate")
    private String endDate;

    @Field(name = "responsibilities")
    private String responsibilities;

}

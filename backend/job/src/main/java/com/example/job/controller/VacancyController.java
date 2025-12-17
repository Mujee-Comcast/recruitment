package com.example.job.controller;

import com.example.job.entity.Vacancy;
import com.example.job.service.VacancyService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/vacancy")
@Validated
public class VacancyController {

    @Autowired
    private VacancyService vacancyService;

    @GetMapping("/search")
    public ResponseEntity<List<Vacancy>> searchVacancies(
            @RequestParam(required = false) String keyword) {
        try {
            List<Vacancy> vacancies = vacancyService.searchVacancies(keyword);
            return ResponseEntity.ok(vacancies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping
    public ResponseEntity<List<Vacancy>> getAllVacancies() {
        try {
            List<Vacancy> vacancies = vacancyService.getAllVacancies();
            return ResponseEntity.ok(vacancies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{vacancyID}")
    public ResponseEntity<Vacancy> getVacancyByVacancyID(@PathVariable String vacancyID) {
        try {
            vacancyID = vacancyID.toUpperCase();
            Vacancy vacancy = vacancyService.getVacancyByVacancyID(vacancyID);
            if (vacancy != null) {
                return ResponseEntity.ok(vacancy);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Vacancy> createVacancy(@Valid @RequestBody Vacancy vacancy) {
        try {
            Vacancy createdVacancy = vacancyService.createVacancy(vacancy);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdVacancy);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{vacancyID}")
    public ResponseEntity<Vacancy> updateVacancy(@PathVariable String vacancyID, @Valid @RequestBody Vacancy vacancy) {
        try {
            vacancyID = vacancyID.toUpperCase();
            vacancy.setId(vacancyID);
            if (vacancyService.getVacancyByVacancyID(vacancy.getVacancyID()) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            Vacancy updatedVacancy = vacancyService.updateVacancy(vacancy);
            return ResponseEntity.ok(updatedVacancy);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{vacancyID}")
    public ResponseEntity<Map<String, String>> deleteVacancy(@PathVariable String vacancyID) {
        try {
            vacancyID = vacancyID.toUpperCase();
            if (vacancyService.getVacancyByVacancyID(vacancyID) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Vacancy not found"));
            }
            vacancyService.deleteVacancy(vacancyID);
            return ResponseEntity.ok(Map.of("message", "Vacancy deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to delete vacancy: " + e.getMessage()));
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getVacancyStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalVacancies", vacancyService.getVacancyCount());
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

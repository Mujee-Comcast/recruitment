package com.example.job.controller.search;

import com.example.job.service.search.SearchSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/search/sync")
@CrossOrigin(origins = "*")
public class SearchSyncController {

    @Autowired
    private SearchSyncService searchSyncService;

    @PostMapping("/all")
    public ResponseEntity<Map<String, Object>> syncAllData() {
        try {
            searchSyncService.syncAllDataAsync();
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Full data synchronization completed successfully");
            response.put("status", "success");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to sync all data");
            errorResponse.put("message", e.getMessage());
            errorResponse.put("status", "error");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @PostMapping("/candidates")
    public ResponseEntity<Map<String, Object>> syncCandidates() {
        try {
            searchSyncService.syncAllCandidates();
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Candidate synchronization completed successfully");
            response.put("status", "success");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to sync candidates");
            errorResponse.put("message", e.getMessage());
            errorResponse.put("status", "error");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @PostMapping("/vacancies")
    public ResponseEntity<Map<String, Object>> syncVacancies() {
        try {
            searchSyncService.syncAllVacancies();
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Vacancy synchronization completed successfully");
            response.put("status", "success");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to sync vacancies");
            errorResponse.put("message", e.getMessage());
            errorResponse.put("status", "error");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getSyncStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Search synchronization service is running");
        response.put("status", "active");
        response.put("endpoints", Map.of(
            "sync_all", "/api/search/sync/all",
            "sync_candidates", "/api/search/sync/candidates",
            "sync_vacancies", "/api/search/sync/vacancies"
        ));
        
        return ResponseEntity.ok(response);
    }
}
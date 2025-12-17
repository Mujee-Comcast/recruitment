package com.example.job.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.job.entity.Candidate;
import com.example.job.service.CandidateService;
import com.example.job.service.ResumeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/candidate")
@Validated
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private ResumeService resumeService;

    @GetMapping("/{candidateID}")
    public ResponseEntity<Candidate> getCandidateByCandidateID(@PathVariable String candidateID) {
        try {
            candidateID = candidateID.toUpperCase();
            Candidate candidate = candidateService.getCandidateByCandidateID(candidateID);
            if (candidate == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(candidate);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        try {
            List<Candidate> candidates = candidateService.getAllCandidates();
            return ResponseEntity.ok(candidates);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Candidate> createCandidate(@Valid @RequestBody Candidate candidate) {
        try {
            Candidate createdCandidate = candidateService.createCandidate(candidate);
            return ResponseEntity.ok(createdCandidate);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{candidateID}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable String candidateID,
            @Valid @RequestBody Candidate candidate) {
        try {
            candidateID = candidateID.toUpperCase();
            candidate.setCandidateID(candidateID);
            if (candidateService.getCandidateByCandidateID(candidate.getCandidateID()) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            Candidate updatedCandidate = candidateService.updateCandidate(candidateID, candidate);
            return ResponseEntity.ok(updatedCandidate);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{candidateID}")
    public ResponseEntity<Map<String, String>> deleteCandidate(@PathVariable String candidateID) {
        try {
            candidateID = candidateID.toUpperCase();
            if (candidateService.getCandidateByCandidateID(candidateID) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Candidate not found"));
            }
            candidateService.deleteCandidate(candidateID);
            return ResponseEntity.ok(Map.of("message", "Candidate deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            Map<String, String> uploadResult = resumeService.uploadResume(file);

            return ResponseEntity.ok(Map.of(
                    "message", "Resume uploaded successfully",
                    "fileUrl", uploadResult.get("fileUrl"),
                    "candidateID", uploadResult.get("candidateID")));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to upload resume: " + e.getMessage()));
        }
    }

    @PostMapping("/parse-resume")
    public ResponseEntity<Candidate> parseResume(@RequestParam("fileUrl") String fileUrl,
            @RequestParam("candidateID") String candidateID) {
        try {
            Candidate parsedContent = resumeService.parseResumeContent(fileUrl, candidateID);
            return ResponseEntity.ok(parsedContent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

}
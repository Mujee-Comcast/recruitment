package com.example.job.service;

import java.util.Map;

import com.example.job.entity.Candidate;

public interface ResumeService {
    Map<String, String> uploadResume(org.springframework.web.multipart.MultipartFile file) throws Exception;
    Candidate parseResumeContent(String fileUrl, String candidateID) throws Exception;
    byte[] getFileFromS3(String fileUrl) throws Exception;
}

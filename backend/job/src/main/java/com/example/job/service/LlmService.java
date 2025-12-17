package com.example.job.service;

import com.example.job.entity.Candidate;

public interface LlmService {
    Candidate formatParsedData(String rawText) throws Exception;
}

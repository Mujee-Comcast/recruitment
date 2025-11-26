package com.example.job.entity.search;

import java.util.List;

public class CandidateSearchResult {
    private List<CandidateDocument> results;
    private long total;

    public CandidateSearchResult(List<CandidateDocument> results, long total) {
        this.results = results;
        this.total = total;
    }

    public List<CandidateDocument> getResults() { return results; }
    public void setResults(List<CandidateDocument> results) { this.results = results; }
    
    public long getTotal() { return total; }
    public void setTotal(long total) { this.total = total; }
}
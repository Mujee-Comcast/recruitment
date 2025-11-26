package com.example.job.entity.search;

import java.util.List;

public class VacancySearchResult {
    private List<VacancyDocument> results;
    private long total;

    public VacancySearchResult(List<VacancyDocument> results, long total) {
        this.results = results;
        this.total = total;
    }

    public List<VacancyDocument> getResults() { 
        return results; 
    }
    
    public void setResults(List<VacancyDocument> results) { 
        this.results = results; 
    }
    
    public long getTotal() { 
        return total; 
    }
    
    public void setTotal(long total) { 
        this.total = total; 
    }
}
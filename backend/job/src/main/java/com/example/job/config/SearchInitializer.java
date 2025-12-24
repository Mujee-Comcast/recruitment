package com.example.job.config;

import com.example.job.service.search.SearchService;
import com.example.job.service.search.SearchSyncService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class SearchInitializer {
    
    private static final Logger logger = LoggerFactory.getLogger(SearchInitializer.class);
    
    @Autowired
    private SearchService searchService;
    
    @Autowired
    private SearchSyncService searchSyncService;
    
    @Bean
    public ApplicationRunner initializeSearch() {
        return args -> {
            try {
                logger.info("Checking OpenSearch indices...");
                if (!searchService.indicesExist()) {
                    logger.info("Initializing OpenSearch indices...");
                    searchService.initializeIndices();
                    logger.info("OpenSearch indices initialized successfully: candidates, vacancies");
                } else {
                    logger.info("OpenSearch indices already exist, skipping initialization");
                }

                logger.info("Starting initial data synchronization...");
                searchSyncService.syncAllDataAsync();
                logger.info("Initial data synchronization started (running asynchronously)");
                
            } catch (Exception e) {
                logger.error("Failed to initialize search indices: {}. Application will continue without search functionality.", e.getMessage());
            }
        };
    }
}
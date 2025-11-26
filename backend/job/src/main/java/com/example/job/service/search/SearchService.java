package com.example.job.service.search;

import com.example.job.entity.search.CandidateDocument;
import com.example.job.entity.search.VacancyDocument;
import com.example.job.entity.search.CandidateFilter;
import com.example.job.entity.search.CandidateSearchRequest;
import com.example.job.entity.search.CandidateSearchResult;
import com.example.job.entity.search.VacancyFilter;
import com.example.job.entity.search.VacancySearchRequest;
import com.example.job.entity.search.VacancySearchResult;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class SearchService {

    @Value("${spring.elasticsearch.uris}")
    private String elasticsearchUri;

    @Value("${search.candidate.index}")
    private String candidateIndex;

    @Value("${search.vacancy.index}")
    private String vacancyIndex;

    @Value("${search.default.size}")
    private int defaultSize;

    @Value("${search.max.size}")
    private int maxSize;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public SearchService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public boolean indicesExist() {
        try {
            String candidateUrl = elasticsearchUri + "/" + candidateIndex;
            String vacancyUrl = elasticsearchUri + "/" + vacancyIndex;
            
            try {
                restTemplate.headForHeaders(candidateUrl);
                restTemplate.headForHeaders(vacancyUrl);
                return true;
            } catch (Exception e) {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    public void initializeIndices() {
        try {
            createCandidateIndex();
            createVacancyIndex();
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize search indices", e);
        }
    }

    private void createCandidateIndex() throws Exception {
        String mapping = """
            {
                "mappings": {
                    "properties": {
                        "id": {"type": "keyword"},
                        "candidateID": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 5.0,
                            "fields": {"keyword": {"type": "keyword"}}
                        },
                        "firstName": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 2.0,
                            "fields": {"keyword": {"type": "keyword"}}
                        },
                        "lastName": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 2.0,
                            "fields": {"keyword": {"type": "keyword"}}
                        },
                        "email": {"type": "keyword"},
                        "mobile": {"type": "keyword"},
                        "role": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 3.0,
                            "fields": {"keyword": {"type": "keyword"}}
                        },
                        "totalExperience": {"type": "text", "analyzer": "standard"},
                        "summary": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 1.5
                        },
                        "primarySkills": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 5.0
                        },
                        "secondarySkills": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 2.0
                        },
                        "education": {
                            "type": "nested",
                            "properties": {
                                "institution": {"type": "text", "analyzer": "standard"},
                                "degree": {"type": "text", "analyzer": "standard"},
                                "fieldOfStudy": {"type": "text", "analyzer": "standard"},
                                "graduationYear": {"type": "keyword"},
                                "grade": {"type": "text", "analyzer": "standard"}
                            }
                        },
                        "certifications": {"type": "text", "analyzer": "standard"},
                        "experience": {
                            "type": "nested",
                            "properties": {
                                "company": {"type": "text", "analyzer": "standard"},
                                "position": {"type": "text", "analyzer": "standard"},
                                "isCurrent": {"type": "boolean"},
                                "startDate": {"type": "keyword"},
                                "endDate": {"type": "keyword"},
                                "responsibilities": {"type": "text", "analyzer": "standard"}
                            }
                        },
                        "fullName": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 2.5,
                            "fields": {"keyword": {"type": "keyword"}}
                        },
                        "allSkills": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 4.0
                        },
                        "searchableContent": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 1.0
                        }
                    }
                },
                "settings": {
                    "analysis": {
                        "analyzer": {
                            "fuzzy_analyzer": {
                                "tokenizer": "standard",
                                "filter": ["lowercase", "asciifolding"]
                            }
                        }
                    }
                }
            }
            """;

        createIndexWithMapping(candidateIndex, mapping);
    }

    private void createVacancyIndex() throws Exception {
        String mapping = """
            {
                "mappings": {
                    "properties": {
                        "id": {"type": "keyword"},
                        "vacancyID": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 5.0,
                            "fields": {"keyword": {"type": "keyword"}}
                        },
                        "title": {
                            "type": "text",
                            "analyzer": "standard",
                            "boost": 4.0,
                            "fields": {"keyword": {"type": "keyword"}}
                        },
                        "description": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 2.0
                        },
                        "level": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 2.5,
                            "fields": {"keyword": {"type": "keyword"}}
                        },
                        "experience": {"type": "integer"},
                        "openPositions": {"type": "integer"},
                        "recruiter": {
                            "type": "text", 
                            "analyzer": "standard",
                            "fields": {"keyword": {"type": "keyword"}}
                        },
                        "primarySkills": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 5.0
                        },
                        "secondarySkills": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 2.0
                        },
                        "allSkills": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 4.0
                        },
                        "searchableContent": {
                            "type": "text", 
                            "analyzer": "standard",
                            "boost": 1.0
                        }
                    }
                },
                "settings": {
                    "analysis": {
                        "analyzer": {
                            "fuzzy_analyzer": {
                                "tokenizer": "standard",
                                "filter": ["lowercase", "asciifolding"]
                            }
                        }
                    }
                }
            }
            """;

        createIndexWithMapping(vacancyIndex, mapping);
    }

    private void createIndexWithMapping(String indexName, String mapping) {
        try {
            String checkUrl = elasticsearchUri + "/" + indexName;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(mapping, headers);
            
            try {
                restTemplate.exchange(checkUrl, HttpMethod.PUT, request, String.class);
                System.out.println("Created index: " + indexName);
            } catch (org.springframework.web.client.HttpClientErrorException e) {
                if (e.getStatusCode().value() == 400 && e.getResponseBodyAsString().contains("already exists")) {
                    System.out.println("Index " + indexName + " already exists, skipping creation");
                } else {
                    throw e;
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to create index: " + indexName + " - " + e.getMessage(), e);
        }
    }

    // Index documents
    public void indexCandidate(CandidateDocument candidate) {
        try {
            String url = elasticsearchUri + "/" + candidateIndex + "/_doc/" + candidate.getId();
            String json = objectMapper.writeValueAsString(candidate);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(json, headers);
            
            restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to index candidate", e);
        }
    }

    public void indexVacancy(VacancyDocument vacancy) {
        try {
            String url = elasticsearchUri + "/" + vacancyIndex + "/_doc/" + vacancy.getId();
            String json = objectMapper.writeValueAsString(vacancy);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(json, headers);
            
            restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to index vacancy", e);
        }
    }

    // Advanced search with filters, sorting, and pagination
    public CandidateSearchResult searchCandidatesAdvanced(CandidateSearchRequest request, int pageNumber, int itemsPerPage) {
        try {

            String searchQuery = buildAdvancedCandidateQuery(request, pageNumber, itemsPerPage);

            List<CandidateDocument> results = executeSearch(candidateIndex, searchQuery, CandidateDocument.class);
            
            long total = getTotalCount(candidateIndex, buildCountQuery(request));
            
            return new CandidateSearchResult(results, total);
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            System.err.println("OpenSearch HTTP error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            throw new RuntimeException("OpenSearch query failed: " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            System.err.println("Search operation failed: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to perform advanced candidate search: " + e.getMessage(), e);
        }
    }

    public VacancySearchResult searchVacanciesAdvanced(VacancySearchRequest request, int pageNumber, int itemsPerPage) {
        try {
            String searchQuery = buildAdvancedVacancyQuery(request, pageNumber, itemsPerPage);
            
            List<VacancyDocument> results = executeSearch(vacancyIndex, searchQuery, VacancyDocument.class);
            
            long total = getTotalCount(vacancyIndex, buildVacancyCountQuery(request));
            
            return new VacancySearchResult(results, total);
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            System.err.println("OpenSearch HTTP error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            throw new RuntimeException("OpenSearch query failed: " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            System.err.println("Search operation failed: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to perform advanced vacancy search: " + e.getMessage(), e);
        }
    }

    private String buildAdvancedCandidateQuery(CandidateSearchRequest request, int pageNumber, int itemsPerPage) {
        StringBuilder mustClauses = new StringBuilder();
        StringBuilder shouldClauses = new StringBuilder();
        boolean hasMust = false;
        boolean hasShould = false;

        if (request.getSearchKey() != null && !request.getSearchKey().trim().isEmpty()) {
            String searchKey = escapeJsonString(request.getSearchKey().trim());
            if (hasShould) shouldClauses.append(",");
            shouldClauses.append(buildMultiMatchQuery(searchKey));
            hasShould = true;
        }
        
        CandidateFilter filter = request.getFilter();
        if (filter != null) {
            if (filter.getCandidateId() != null && !filter.getCandidateId().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildTermQuery("candidateID", filter.getCandidateId().toLowerCase()));
                hasMust = true;
            }

            if (filter.getName() != null && !filter.getName().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildNameQuery(filter.getName()));
                hasMust = true;
            } else {
                if (filter.getFirstName() != null && !filter.getFirstName().trim().isEmpty()) {
                    if (hasMust) mustClauses.append(",");
                    mustClauses.append(buildFieldMatchQuery("firstName", filter.getFirstName()));
                    hasMust = true;
                }
                if (filter.getLastName() != null && !filter.getLastName().trim().isEmpty()) {
                    if (hasMust) mustClauses.append(",");
                    mustClauses.append(buildFieldMatchQuery("lastName", filter.getLastName()));
                    hasMust = true;
                }
            }
            
            if (filter.getEmail() != null && !filter.getEmail().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildTermQuery("email", filter.getEmail().toLowerCase()));
                hasMust = true;
            }
            
            if (filter.getMobile() != null && !filter.getMobile().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildTermQuery("mobile", filter.getMobile()));
                hasMust = true;
            }
            
            if (filter.getRole() != null && !filter.getRole().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildRoleQuery(filter.getRole()));
                hasMust = true;
            }
            
            if (filter.getTotalExperience() != null && !filter.getTotalExperience().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildFieldMatchQuery("totalExperience", filter.getTotalExperience()));
                hasMust = true;
            }
            
            if (filter.getPrimarySkills() != null && !filter.getPrimarySkills().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildSkillsQuery(String.join(" ", filter.getPrimarySkills()), "primarySkills"));
                hasMust = true;
            }
            
            if (filter.getSecondarySkills() != null && !filter.getSecondarySkills().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildSkillsQuery(String.join(" ", filter.getSecondarySkills()), "secondarySkills"));
                hasMust = true;
            }
            
            if (filter.getSummary() != null && !filter.getSummary().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildFieldMatchQuery("summary", filter.getSummary()));
                hasMust = true;
            }
            
            if (filter.getCertifications() != null && !filter.getCertifications().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildSkillsQuery(String.join(" ", filter.getCertifications()), "certifications"));
                hasMust = true;
            }
            
            if (filter.getResumeLink() != null && !filter.getResumeLink().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildTermQuery("resumeLink", filter.getResumeLink()));
                hasMust = true;
            }
            
            if (filter.getExperienceCompany() != null && !filter.getExperienceCompany().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildNestedQuery("experience", "experience.company", filter.getExperienceCompany()));
                hasMust = true;
            }
            
            if (filter.getExperiencePosition() != null && !filter.getExperiencePosition().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildNestedQuery("experience", "experience.position", filter.getExperiencePosition()));
                hasMust = true;
            }
            
            if (filter.getExperienceStartDate() != null && !filter.getExperienceStartDate().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildNestedQuery("experience", "experience.startDate", filter.getExperienceStartDate()));
                hasMust = true;
            }
            
            if (filter.getExperienceEndDate() != null && !filter.getExperienceEndDate().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildNestedQuery("experience", "experience.endDate", filter.getExperienceEndDate()));
                hasMust = true;
            }

            if (filter.getEducationInstitution() != null && !filter.getEducationInstitution().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildNestedQuery("education", "education.institution", filter.getEducationInstitution()));
                hasMust = true;
            }
            
            if (filter.getEducationDegree() != null && !filter.getEducationDegree().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildNestedQuery("education", "education.degree", filter.getEducationDegree()));
                hasMust = true;
            }
            
            if (filter.getEducationFieldOfStudy() != null && !filter.getEducationFieldOfStudy().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildNestedQuery("education", "education.fieldOfStudy", filter.getEducationFieldOfStudy()));
                hasMust = true;
            }
            
            if (filter.getEducationGraduationYear() != null && !filter.getEducationGraduationYear().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildNestedQuery("education", "education.graduationYear", filter.getEducationGraduationYear()));
                hasMust = true;
            }
        }
        

        StringBuilder query = new StringBuilder();
        query.append("{");
        query.append("\"from\": ").append(pageNumber * itemsPerPage).append(",");
        query.append("\"size\": ").append(itemsPerPage).append(",");

        if (request.getSortField() != null && !request.getSortField().trim().isEmpty()) {
            String sortOrder = "DESC".equalsIgnoreCase(request.getSortOrder()) ? "desc" : "asc";
            String sortField = mapSortField(request.getSortField());
            query.append("\"sort\": [{\"").append(sortField).append("\": {\"order\": \"").append(sortOrder).append("\"}}],");
        }

        if (hasMust || hasShould) {
            query.append("\"query\": {\"bool\": {");
            if (hasMust) {
                query.append("\"must\": [").append(mustClauses.toString()).append("]");
                if (hasShould) query.append(",");
            }
            if (hasShould) {
                query.append("\"should\": [").append(shouldClauses.toString()).append("],");
                query.append("\"minimum_should_match\": 1");
            }
            query.append("}}");
        } else {
            query.append("\"query\": {\"match_all\": {}}");
        }
        
        query.append("}");
        return query.toString();
    }

    private String buildAdvancedVacancyQuery(VacancySearchRequest request, int pageNumber, int itemsPerPage) {
        StringBuilder mustClauses = new StringBuilder();
        StringBuilder shouldClauses = new StringBuilder();
        boolean hasMust = false;
        boolean hasShould = false;

        if (request.getSearchKey() != null && !request.getSearchKey().trim().isEmpty()) {
            String searchKey = escapeJsonString(request.getSearchKey().trim());
            if (hasShould) shouldClauses.append(",");
            shouldClauses.append(buildVacancyMultiMatchQuery(searchKey));
            hasShould = true;
        }
        
        VacancyFilter filter = request.getFilter();
        if (filter != null) {
            if (filter.getVacancyID() != null && !filter.getVacancyID().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildTermQuery("vacancyID", filter.getVacancyID().toLowerCase()));
                hasMust = true;
            }

            if (filter.getTitle() != null && !filter.getTitle().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildFieldMatchQuery("title", filter.getTitle()));
                hasMust = true;
            }

            if (filter.getDescription() != null && !filter.getDescription().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildFieldMatchQuery("description", filter.getDescription()));
                hasMust = true;
            }

            if (filter.getLevel() != null && !filter.getLevel().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildFieldMatchQuery("level", filter.getLevel()));
                hasMust = true;
            }

            if (filter.getExperience() != null) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildRangeQuery("experience", filter.getExperience()));
                hasMust = true;
            }

            if (filter.getOpenPositions() != null) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildRangeQuery("openPositions", filter.getOpenPositions()));
                hasMust = true;
            }

            if (filter.getRecruiter() != null && !filter.getRecruiter().trim().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildFieldMatchQuery("recruiter", filter.getRecruiter()));
                hasMust = true;
            }

            if (filter.getPrimarySkills() != null && !filter.getPrimarySkills().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildSkillsQuery(String.join(" ", filter.getPrimarySkills()), "primarySkills"));
                hasMust = true;
            }

            if (filter.getSecondarySkills() != null && !filter.getSecondarySkills().isEmpty()) {
                if (hasMust) mustClauses.append(",");
                mustClauses.append(buildSkillsQuery(String.join(" ", filter.getSecondarySkills()), "secondarySkills"));
                hasMust = true;
            }
        }

        StringBuilder query = new StringBuilder();
        query.append("{");
        query.append("\"from\": ").append(pageNumber * itemsPerPage).append(",");
        query.append("\"size\": ").append(itemsPerPage).append(",");

        if (request.getSortField() != null && !request.getSortField().trim().isEmpty()) {
            String sortOrder = "DESC".equalsIgnoreCase(request.getSortOrder()) ? "desc" : "asc";
            String sortField = mapVacancySortField(request.getSortField());
            query.append("\"sort\": [{\"").append(sortField).append("\": {\"order\": \"").append(sortOrder).append("\"}}],");
        }

        if (hasMust || hasShould) {
            query.append("\"query\": {\"bool\": {");
            if (hasMust) {
                query.append("\"must\": [").append(mustClauses.toString()).append("]");
                if (hasShould) query.append(",");
            }
            if (hasShould) {
                query.append("\"should\": [").append(shouldClauses.toString()).append("],");
                query.append("\"minimum_should_match\": 1");
            }
            query.append("}}");
        } else {
            query.append("\"query\": {\"match_all\": {}}");
        }
        
        query.append("}");
        return query.toString();
    }

    private String buildVacancyMultiMatchQuery(String searchKey) {
        return "{\"multi_match\": {" +
               "\"query\": \"" + searchKey + "\"," +
               "\"fields\": [\"vacancyID^5.0\", \"title^4.0\", \"primarySkills^5.0\", \"level^2.5\", \"searchableContent^1.0\"]," +
               "\"type\": \"best_fields\"," +
               "\"fuzziness\": \"AUTO\"" +
               "}}";
    }

    private String buildRangeQuery(String field, Integer value) {
        return "{\"range\": {" +
               "\"" + field + "\": {\"gte\": " + value + "}" +
               "}}";
    }

    private String mapVacancySortField(String sortField) {
        return switch (sortField.toLowerCase()) {
            case "title" -> "title.keyword";
            case "level" -> "level.keyword";
            case "experience" -> "experience";
            case "openpositions" -> "openPositions";
            case "recruiter" -> "recruiter.keyword";
            default -> "_score";
        };
    }

    private String buildVacancyCountQuery(VacancySearchRequest request) {
        return "{ \"query\": { \"match_all\": {} } }";
    }
    
    private String buildMultiMatchQuery(String searchKey) {
        return "{\"multi_match\": {" +
               "\"query\": \"" + searchKey + "\"," +
               "\"fields\": [\"candidateID^5.0\", \"role^3.0\", \"primarySkills^5.0\", \"fullName^2.5\", \"searchableContent^1.0\"]," +
               "\"type\": \"best_fields\"," +
               "\"fuzziness\": \"AUTO\"" +
               "}}";
    }
    
    private String buildNameQuery(String name) {
        return "{\"multi_match\": {" +
               "\"query\": \"" + escapeJsonString(name) + "\"," +
               "\"fields\": [\"firstName\", \"lastName\", \"fullName\"]" +
               "}}";
    }
    
    private String buildRoleQuery(String role) {
        return "{\"match\": {" +
               "\"role\": {\"query\": \"" + escapeJsonString(role) + "\", \"fuzziness\": \"AUTO\"}" +
               "}}";
    }
    
    private String buildSkillsQuery(String skills, String field) {
        return "{\"match\": {" +
               "\"" + field + "\": {\"query\": \"" + escapeJsonString(skills) + "\", \"operator\": \"or\"}" +
               "}}";
    }
    
    private String buildTermQuery(String field, String value) {
        return "{\"term\": {\"" + field + "\": \"" + escapeJsonString(value) + "\"}}";
    }
    
    private String mapSortField(String sortField) {
        return switch (sortField.toLowerCase()) {
            case "name" -> "fullName.keyword";
            case "role" -> "role.keyword";
            case "experience" -> "totalExperience";
            case "email" -> "email";
            case "firstname" -> "firstName.keyword";
            case "lastname" -> "lastName.keyword";
            default -> "_score";
        };
    }
    
    private String escapeJsonString(String input) {
        if (input == null) return "";
        return input.replace("\\", "\\\\")
                   .replace("\"", "\\\"")
                   .replace("\n", "\\n")
                   .replace("\r", "\\r")
                   .replace("\t", "\\t");
    }
    
    private String buildFieldMatchQuery(String field, String value) {
        return "{\"match\": {" +
               "\"" + field + "\": {\"query\": \"" + escapeJsonString(value) + "\", \"fuzziness\": \"AUTO\"}" +
               "}}";
    }
    
    private String buildNestedQuery(String path, String field, String value) {
        return "{\"nested\": {" +
               "\"path\": \"" + path + "\"," +
               "\"query\": {\"match\": {" +
               "\"" + field + "\": {\"query\": \"" + escapeJsonString(value) + "\", \"fuzziness\": \"AUTO\"}" +
               "}}" +
               "}}";
    }

    private String buildCountQuery(CandidateSearchRequest request) {
        return "{ \"query\": { \"match_all\": {} } }";
    }
    
    private long getTotalCount(String indexName, String countQuery) {
        try {
            String url = elasticsearchUri + "/" + indexName + "/_count";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(countQuery, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
            JsonNode root = objectMapper.readTree(response.getBody());
            return root.path("count").asLong();
        } catch (Exception e) {
            return 0L;
        }
    }

    public List<CandidateDocument> searchCandidates(String query, int size, boolean fuzzy) {
        try {
            size = Math.min(size, maxSize);
            String searchQuery = buildCandidateSearchQuery(query, size, fuzzy);
            return executeSearch(candidateIndex, searchQuery, CandidateDocument.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to search candidates", e);
        }
    }

    public List<VacancyDocument> searchVacancies(String query, int size, boolean fuzzy) {
        try {
            size = Math.min(size, maxSize);
            String searchQuery = buildVacancySearchQuery(query, size, fuzzy);
            return executeSearch(vacancyIndex, searchQuery, VacancyDocument.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to search vacancies", e);
        }
    }

    private String buildCandidateSearchQuery(String query, int size, boolean fuzzy) {
        String fuzziness = fuzzy ? "\"fuzziness\": \"AUTO\"," : "";
        
        return """
            {
                "size": %d,
                "query": {
                    "bool": {
                        "should": [
                            {
                                "multi_match": {
                                    "query": "%s",
                                    "fields": [
                                        "candidateID^5.0",
                                        "role^3.0",
                                        "primarySkills^5.0",
                                        "secondarySkills^2.0",
                                        "fullName^2.5",
                                        "firstName^2.0",
                                        "lastName^2.0",
                                        "summary^1.5",
                                        "allSkills^4.0",
                                        "searchableContent^1.0"
                                    ],
                                    "type": "best_fields",
                                    %s
                                    "operator": "or"
                                }
                            },
                            {
                                "match_phrase": {
                                    "searchableContent": {
                                        "query": "%s",
                                        "boost": 2.0
                                    }
                                }
                            }
                        ],
                        "minimum_should_match": 1
                    }
                },
                "highlight": {
                    "fields": {
                        "role": {},
                        "primarySkills": {},
                        "summary": {},
                        "fullName": {}
                    }
                }
            }
            """.formatted(size, query, fuzziness, query);
    }

    private String buildVacancySearchQuery(String query, int size, boolean fuzzy) {
        String fuzziness = fuzzy ? "\"fuzziness\": \"AUTO\"," : "";
        
        return """
            {
                "size": %d,
                "query": {
                    "bool": {
                        "should": [
                            {
                                "multi_match": {
                                    "query": "%s",
                                    "fields": [
                                        "vacancyID^5.0",
                                        "title^4.0",
                                        "primarySkills^5.0",
                                        "secondarySkills^2.0",
                                        "level^2.5",
                                        "description^2.0",
                                        "allSkills^4.0",
                                        "searchableContent^1.0"
                                    ],
                                    "type": "best_fields",
                                    %s
                                    "operator": "or"
                                }
                            },
                            {
                                "match_phrase": {
                                    "searchableContent": {
                                        "query": "%s",
                                        "boost": 2.0
                                    }
                                }
                            }
                        ],
                        "minimum_should_match": 1
                    }
                },
                "highlight": {
                    "fields": {
                        "title": {},
                        "primarySkills": {},
                        "description": {}
                    }
                }
            }
            """.formatted(size, query, fuzziness, query);
    }

    private <T> List<T> executeSearch(String indexName, String query, Class<T> resultClass) throws Exception {
        String url = elasticsearchUri + "/" + indexName + "/_search";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(query, headers);
        
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
            
            JsonNode root = objectMapper.readTree(response.getBody());

            if (root.has("error")) {
                JsonNode error = root.get("error");
                String errorMsg = error.has("reason") ? error.get("reason").asText() : error.toString();
                throw new RuntimeException("OpenSearch error: " + errorMsg);
            }
            
            JsonNode hits = root.path("hits").path("hits");
            
            List<T> results = new ArrayList<>();
            for (JsonNode hit : hits) {
                JsonNode source = hit.path("_source");
                T document = objectMapper.treeToValue(source, resultClass);
                results.add(document);
            }
            
            return results;
        } catch (org.springframework.web.client.ResourceAccessException e) {
            throw new RuntimeException("Cannot connect to OpenSearch at " + url + ". Check if OpenSearch is running.", e);
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            throw new RuntimeException("OpenSearch HTTP error " + e.getStatusCode() + ": " + e.getResponseBodyAsString(), e);
        }
    }

    public void deleteCandidateById(String id) {
        deleteDocumentById(candidateIndex, id);
    }

    public void deleteVacancyById(String id) {
        deleteDocumentById(vacancyIndex, id);
    }

    private void deleteDocumentById(String indexName, String id) {
        try {
            String url = elasticsearchUri + "/" + indexName + "/_doc/" + id;
            restTemplate.delete(url);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete document", e);
        }
    }
}
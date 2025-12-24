package com.example.job.controller.search;

import com.example.job.entity.search.CandidateSearchRequest;
import com.example.job.entity.search.CandidateSearchResult;
import com.example.job.entity.search.VacancySearchRequest;
import com.example.job.entity.search.VacancySearchResult;
import com.example.job.service.search.SearchService;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/search")
@Tag(name = "Search Services", description = "APIs for advanced search functionality")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @Value("${search.default.size}")
    private int defaultSize;

    @PostMapping("/candidate")
    public ResponseEntity<Map<String, Object>> searchCandidates(
            @RequestBody CandidateSearchRequest request) {
        try {
            int pageNumber = request.getPageNumber() != null && request.getPageNumber() >= 0 ? request.getPageNumber()
                    : 0;
            int itemsPerPage = request.getItemsPerPage() != null && request.getItemsPerPage() > 0
                    ? request.getItemsPerPage()
                    : defaultSize;
            itemsPerPage = Math.min(itemsPerPage, 100);

            CandidateSearchResult searchResult = searchService.searchCandidatesAdvanced(request, pageNumber,
                    itemsPerPage);

            Map<String, Object> response = new HashMap<>();
            response.put("results", searchResult.getResults());
            response.put("total", searchResult.getTotal());
            response.put("pageNumber", pageNumber);
            response.put("itemsPerPage", itemsPerPage);
            response.put("totalPages", (int) Math.ceil((double) searchResult.getTotal() / itemsPerPage));
            response.put("hasNext", (pageNumber + 1) * itemsPerPage < searchResult.getTotal());
            response.put("hasPrevious", pageNumber > 0);
            response.put("appliedFilters", request.getFilter());
            response.put("searchKey", request.getSearchKey());
            response.put("sortField", request.getSortField());
            response.put("sortOrder", request.getSortOrder());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to search candidates");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/vacancy")
    public ResponseEntity<Map<String, Object>> searchVacancies(
            @RequestBody VacancySearchRequest request) {
        try {
            int pageNumber = request.getPageNumber() != null && request.getPageNumber() >= 0 ? request.getPageNumber()
                    : 0;
            int itemsPerPage = request.getItemsPerPage() != null && request.getItemsPerPage() > 0
                    ? request.getItemsPerPage()
                    : defaultSize;
            itemsPerPage = Math.min(itemsPerPage, 100);

            VacancySearchResult searchResult = searchService.searchVacanciesAdvanced(request, pageNumber, itemsPerPage);

            Map<String, Object> response = new HashMap<>();
            response.put("results", searchResult.getResults());
            response.put("total", searchResult.getTotal());
            response.put("pageNumber", pageNumber);
            response.put("itemsPerPage", itemsPerPage);
            response.put("totalPages", (int) Math.ceil((double) searchResult.getTotal() / itemsPerPage));
            response.put("hasNext", (pageNumber + 1) * itemsPerPage < searchResult.getTotal());
            response.put("hasPrevious", pageNumber > 0);
            response.put("appliedFilters", request.getFilter());
            response.put("searchKey", request.getSearchKey());
            response.put("sortField", request.getSortField());
            response.put("sortOrder", request.getSortOrder());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to search vacancies");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
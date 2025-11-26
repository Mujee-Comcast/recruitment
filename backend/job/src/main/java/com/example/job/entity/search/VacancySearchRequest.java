package com.example.job.entity.search;

public class VacancySearchRequest {
    private VacancyFilter filter;
    private String searchKey;
    private String sortField;
    private String sortOrder;
    private Integer pageNumber;
    private Integer itemsPerPage;

    public VacancyFilter getFilter() { 
        return filter; 
    }
    
    public void setFilter(VacancyFilter filter) { 
        this.filter = filter; 
    }
    
    public String getSearchKey() { 
        return searchKey; 
    }
    
    public void setSearchKey(String searchKey) { 
        this.searchKey = searchKey; 
    }
    
    public String getSortField() { 
        return sortField; 
    }
    
    public void setSortField(String sortField) { 
        this.sortField = sortField; 
    }
    
    public String getSortOrder() { 
        return sortOrder; 
    }
    
    public void setSortOrder(String sortOrder) { 
        this.sortOrder = sortOrder; 
    }
    
    public Integer getPageNumber() { 
        return pageNumber; 
    }
    
    public void setPageNumber(Integer pageNumber) { 
        this.pageNumber = pageNumber; 
    }
    
    public Integer getItemsPerPage() { 
        return itemsPerPage; 
    }
    
    public void setItemsPerPage(Integer itemsPerPage) { 
        this.itemsPerPage = itemsPerPage; 
    }
}
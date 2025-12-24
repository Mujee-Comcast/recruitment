import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { VacancySearchRequest, VacancySearchResponse, VacancyResponse } from '../../../shared/interfaces/vacancy-search.interface';
import { ApiService } from '../../../shared/services/api.service';
import { Vacancy } from '../../../shared/interfaces/vacancy.interface';

@Component({
  selector: 'app-vacancy-search',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './vacancy-search.component.html',
  styleUrl: './vacancy-search.component.scss'
})
export class VacancySearchComponent implements OnInit {
  displayedColumns: string[] = [
    'vacancyID',
    'title', 
    'description',
    'level',
    'experience',
    'openPositions',
    'recruiter',
    'primarySkills',
    'secondarySkills'
  ];

  allVacancies: VacancyResponse[] = [];
  filteredVacancies: VacancyResponse[] = [];
  paginatedVacancies: VacancyResponse[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  isSearchExecuted: boolean = false;
  
  // Advanced filter form
  filterForm: FormGroup;
  showAdvancedFilters: boolean = false;
  
  // Filter options
  jobLevels: string[] = [];
  recruiters: string[] = [];
  allSkills: string[] = [];

  // Pagination properties
  pageSize: number = 5;
  pageIndex: number = 0;
  totalItems: number = 0;

  // Sorting properties
  currentSortField: string = 'vacancyID';
  currentSortOrder: 'ASC' | 'DESC' = 'ASC';

  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) {
    this.filterForm = this.fb.group({
      jobId: [''],
      jobTitle: [''],
      jobLevel: [''],
      recruiter: [''],
      skills: [[]]
    });
  }

  ngOnInit(): void {
    this.initializeFilterOptions();
    // Load all vacancies on page load with default search criteria
    this.searchVacancies();
  }

  private initializeFilterOptions(): void {
    // Extract unique job levels from mock data for filter options
    this.jobLevels = [].sort();
    
    // Extract unique recruiters from mock data for filter options
    this.recruiters = [].sort();
    
    // Extract all skills (primary and secondary) from mock data for filter options
    const allSkillsSet = new Set<string>();
    this.allSkills = Array.from(allSkillsSet).sort();
  }

  // Search will only trigger when apply button is clicked

  searchVacancies(): void {
    this.isLoading = true;
    this.pageIndex = 0;

    const searchRequest: VacancySearchRequest = this.buildSearchRequest();
    
    this.apiService.searchVacancies(searchRequest).subscribe({
      next: (response: VacancySearchResponse) => {
        this.allVacancies = response.results;
        this.filteredVacancies = response.results;
        this.totalItems = response.results.length;
        this.updatePaginatedData();
        this.isSearchExecuted = true;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching vacancies:', error);
        this.isLoading = false;
        // Handle error - could show a snackbar or error message
      }
    });
  }

  private buildSearchRequest(): VacancySearchRequest {
    const formValues = this.filterForm.value;
    
    return {
      searchKey: this.searchTerm || '',
      filter: {
        vacancyID: formValues.jobId && formValues.jobId.trim() ? formValues.jobId : null,
        title: formValues.jobTitle && formValues.jobTitle.trim() ? formValues.jobTitle : null,
        description: null, // Not available in the form
        level: formValues.jobLevel || null,
        experience: null, // Not available in the form
        openPositions: null, // Not available in the form
        recruiter: formValues.recruiter || null,
        primarySkills: formValues.skills && formValues.skills.length > 0 ? formValues.skills : null,
        secondarySkills: null // Could be extended to separate primary/secondary skills
      },
      sortField: this.currentSortField,
      sortOrder: this.currentSortOrder,
      pageNumber: this.pageIndex,
      itemsPerPage: this.pageSize
    };
  }

  private filterVacancies(): void {
    // This method is now handled by the API search
    // Keep for local filtering if needed, but main search is through API
    this.updatePaginatedData();
  }

  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  applyFilters(): void {
    this.searchVacancies();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchVacancies();
    // Don't auto-search, user needs to click apply
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterForm.reset();
    this.pageIndex = 0;
    this.isSearchExecuted = false;
    this.allVacancies = [];
    this.filteredVacancies = [];
    this.paginatedVacancies = [];
    this.totalItems = 0;
  }

  hasActiveFilters(): boolean {
    const formValues = this.filterForm.value;
    return this.searchTerm.trim() !== '' ||
           (formValues.jobId && formValues.jobId.trim()) ||
           (formValues.jobTitle && formValues.jobTitle.trim()) ||
           formValues.jobLevel ||
           formValues.recruiter ||
           (formValues.skills && formValues.skills.length > 0);
  }

  getActiveFilterCount(): number {
    const formValues = this.filterForm.value;
    let count = 0;
    
    if (this.searchTerm.trim()) count++;
    if (formValues.jobId && formValues.jobId.trim()) count++;
    if (formValues.jobTitle && formValues.jobTitle.trim()) count++;
    if (formValues.jobLevel) count++;
    if (formValues.recruiter) count++;
    if (formValues.skills && formValues.skills.length > 0) count++;
    
    return count;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    
    if (this.isSearchExecuted) {
      // Re-search with new pagination
      this.searchVacancies();
    } else {
      this.updatePaginatedData();
    }
  }

  private updatePaginatedData(): void {
    if (!this.filteredVacancies || !Array.isArray(this.filteredVacancies)) {
      this.paginatedVacancies = [];
      return;
    }
    
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedVacancies = this.filteredVacancies.slice(startIndex, endIndex);
  }

  getSkillsText(skills: string[]): string {
    return skills.join(', ');
  }

  getJobLevelClass(jobLevel: string): string {
    return 'level-' + jobLevel.toLowerCase().replace(/[^a-z]/g, '');
  }

  viewVacancyDetails(vacancyID: string): void {
    this.router.navigate(['/vacancy', vacancyID]);
  }

  navigateToCreate(): void {
    this.router.navigate(['/vacancy/create']);
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.currentSortField = 'vacancyID';
      this.currentSortOrder = 'ASC';
    } else {
      // Map frontend column names to API field names
      const fieldMapping: { [key: string]: string } = {
        'vacancyID': 'vacancyID',
        'title': 'title',
        'level': 'level',
        'experience': 'experience',
        'openPositions': 'openPositions',
        'recruiter': 'recruiter'
      };

      this.currentSortField = fieldMapping[sort.active] || sort.active;
      this.currentSortOrder = sort.direction.toUpperCase() as 'ASC' | 'DESC';
    }

    this.pageIndex = 0; // Reset to first page after sorting
    
    if (this.isSearchExecuted) {
      // Re-search with new sorting
      this.searchVacancies();
    }
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

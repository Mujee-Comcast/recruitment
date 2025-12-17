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
import { Router } from '@angular/router';
import { Vacancy, VACANCY_MOCK_DATA } from '../../../shared/data/vacancy-mock-data';

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
    MatSortModule
  ],
  templateUrl: './vacancy-search.component.html',
  styleUrl: './vacancy-search.component.scss'
})
export class VacancySearchComponent implements OnInit {
  displayedColumns: string[] = [
    'jobId',
    'jobTitle',
    'jobDescription',
    'jobLevel',
    'experience',
    'openPositions',
    'recruiter',
    'primarySkills',
    'secondarySkills'
  ];

  allVacancies: Vacancy[] = VACANCY_MOCK_DATA;
  filteredVacancies: Vacancy[] = [];
  paginatedVacancies: Vacancy[] = [];
  searchTerm: string = '';
  
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

  constructor(private router: Router, private fb: FormBuilder) {
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
    this.filterVacancies();
  }

  private initializeFilterOptions(): void {
    // Extract unique job levels
    this.jobLevels = [...new Set(this.allVacancies.map(v => v.jobLevel))].sort();
    
    // Extract unique recruiters
    this.recruiters = [...new Set(this.allVacancies.map(v => v.recruiter))].sort();
    
    // Extract all skills (primary and secondary)
    const allSkillsSet = new Set<string>();
    this.allVacancies.forEach(vacancy => {
      vacancy.primarySkills.forEach(skill => allSkillsSet.add(skill));
      vacancy.secondarySkills.forEach(skill => allSkillsSet.add(skill));
    });
    this.allSkills = Array.from(allSkillsSet).sort();
  }

  onSearchChange(): void {
    this.pageIndex = 0;
    this.filterVacancies();
  }

  private filterVacancies(): void {
    let filtered = [...this.allVacancies];

    // Apply text search
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(vacancy =>
        vacancy.jobTitle.toLowerCase().includes(searchLower) ||
        vacancy.jobDescription.toLowerCase().includes(searchLower) ||
        vacancy.recruiter.toLowerCase().includes(searchLower) ||
        vacancy.primarySkills.some(skill => skill.toLowerCase().includes(searchLower)) ||
        vacancy.secondarySkills.some(skill => skill.toLowerCase().includes(searchLower)) ||
        vacancy.jobId.toLowerCase().includes(searchLower)
      );
    }

    // Apply advanced filters
    const formValues = this.filterForm.value;
    
    if (formValues.jobId && formValues.jobId.trim()) {
      filtered = filtered.filter(vacancy => 
        vacancy.jobId.toLowerCase().includes(formValues.jobId.toLowerCase())
      );
    }

    if (formValues.jobTitle && formValues.jobTitle.trim()) {
      filtered = filtered.filter(vacancy => 
        vacancy.jobTitle.toLowerCase().includes(formValues.jobTitle.toLowerCase())
      );
    }

    if (formValues.jobLevel) {
      filtered = filtered.filter(vacancy => vacancy.jobLevel === formValues.jobLevel);
    }

    if (formValues.recruiter) {
      filtered = filtered.filter(vacancy => vacancy.recruiter === formValues.recruiter);
    }

    if (formValues.skills && formValues.skills.length > 0) {
      filtered = filtered.filter(vacancy => {
        const allVacancySkills = [...vacancy.primarySkills, ...vacancy.secondarySkills];
        return formValues.skills.some((selectedSkill: string) => 
          allVacancySkills.includes(selectedSkill)
        );
      });
    }

    this.filteredVacancies = filtered;
    this.totalItems = this.filteredVacancies.length;
    this.updatePaginatedData();
  }

  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  applyFilters(): void {
    this.pageIndex = 0;
    this.filterVacancies();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearchChange();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterForm.reset();
    this.pageIndex = 0;
    this.filterVacancies();
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
    this.updatePaginatedData();
  }

  private updatePaginatedData(): void {
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

  viewVacancyDetails(jobId: string): void {
    this.router.navigate(['/vacancy', jobId]);
  }

  navigateToCreate(): void {
    this.router.navigate(['/vacancy/create']);
  }

  sortData(sort: Sort): void {
    const data = this.filteredVacancies.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredVacancies = data;
      this.updatePaginatedData();
      return;
    }

    this.filteredVacancies = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'jobId':
          return compare(a.jobId, b.jobId, isAsc);
        case 'jobTitle':
          return compare(a.jobTitle, b.jobTitle, isAsc);
        case 'jobLevel':
          return compare(a.jobLevel, b.jobLevel, isAsc);
        case 'experience':
          return compare(a.experience, b.experience, isAsc);
        case 'openPositions':
          return compare(a.openPositions, b.openPositions, isAsc);
        case 'recruiter':
          return compare(a.recruiter, b.recruiter, isAsc);
        default:
          return 0;
      }
    });
    this.pageIndex = 0; // Reset to first page after sorting
    this.updatePaginatedData();
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

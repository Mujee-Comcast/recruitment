import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { Vacancy, VACANCY_MOCK_DATA } from '../shared/data/vacancy-mock-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
  selectedJobLevel: string = '';

  // Filter options
  jobLevels: string[] = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Principal'];

  // Pagination properties
  pageSize: number = 5;
  pageIndex: number = 0;
  totalItems: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filterVacancies();
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

    // Apply job level filter
    if (this.selectedJobLevel) {
      filtered = filtered.filter(vacancy => vacancy.jobLevel === this.selectedJobLevel);
    }

    this.filteredVacancies = filtered;
    this.totalItems = this.filteredVacancies.length;
    this.updatePaginatedData();
  }

  filterByJobLevel(level: string): void {
    this.selectedJobLevel = this.selectedJobLevel === level ? '' : level;
    this.pageIndex = 0;
    this.filterVacancies();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearchChange();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedJobLevel = '';
    this.pageIndex = 0;
    this.filterVacancies();
  }

  hasActiveFilters(): boolean {
    return this.searchTerm.trim() !== '' || this.selectedJobLevel !== '';
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
}

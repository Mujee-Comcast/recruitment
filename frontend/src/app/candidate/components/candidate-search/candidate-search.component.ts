import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { CandidateSearchRequest, CandidateSearchFilter, CandidateSearchResponse } from '../../../shared/interfaces/candidate-search.interface';


@Component({
  selector: 'app-candidate-search',
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
    MatButtonModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule
  ],
  templateUrl: './candidate-search.component.html',
  styleUrl: './candidate-search.component.scss'
})
export class CandidateSearchComponent implements OnInit {
  displayedColumns: string[] = [
    'candidateId',
    'candidateName',
    'role',
    'profileSummary',
    'overallExperience',
    'primarySkills',
    'secondarySkills',
    'email',
    'mobileNumber'
  ];

  candidates: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  


  // Advanced filter form
  filterForm: FormGroup;
  showAdvancedFilters: boolean = false;
  
  // Filter options (can be loaded from API or defined statically)
  allRoles: string[] = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Data Scientist'];
  experienceLevels: string[] = ['Entry Level (0-1 years)', 'Junior (1-3 years)', 'Mid-level (3-5 years)', 'Senior (5-8 years)', 'Lead/Principal (8+ years)'];
  allSkills: string[] = ['Angular', 'React', 'Vue', 'TypeScript', 'JavaScript', 'Java', 'Python', 'C#', 'Node.js'];

  // Pagination properties
  pageSize: number = 10;
  pageIndex: number = 0;
  totalItems: number = 0;
  totalPages: number = 0;

  // Sorting properties
  sortField: string = 'totalExperience';
  sortOrder: 'ASC' | 'DESC' = 'ASC';

  // File upload properties
  selectedFile: File | null = null;
  isUploading: boolean = false;
  uploadProgress: number = 0;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.filterForm = this.fb.group({
      candidateId: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      role: [''],
      totalExperience: [''],
      primarySkills: [''],
      secondarySkills: [''],
      summary: [''],
      certifications: [''],
      experienceCompany: [''],
      experiencePosition: [''],
      educationInstitution: [''],
      educationDegree: [''],
      educationFieldOfStudy: [''],
      educationGraduationYear: ['']
    });
  }

  ngOnInit(): void {
    // Initial search
    this.searchCandidates();
  }

  private buildSearchRequest(): CandidateSearchRequest {
    const formValues = this.filterForm.value;
    
    const filter: CandidateSearchFilter = {
      candidateId: formValues.candidateId?.trim() || null,
      firstName: formValues.firstName?.trim() || null,
      lastName: formValues.lastName?.trim() || null,
      email: formValues.email?.trim() || null,
      mobile: formValues.mobile?.trim() || null,
      role: formValues.role || null,
      totalExperience: formValues.totalExperience || null,
      primarySkills: this.convertToStringArray(formValues.primarySkills),
      secondarySkills: this.convertToStringArray(formValues.secondarySkills),
      summary: formValues.summary?.trim() || null,
      certifications: formValues.certifications?.trim() || null,
      experienceCompany: formValues.experienceCompany?.trim() || null,
      experiencePosition: formValues.experiencePosition?.trim() || null,
      educationInstitution: formValues.educationInstitution?.trim() || null,
      educationDegree: formValues.educationDegree?.trim() || null,
      educationFieldOfStudy: formValues.educationFieldOfStudy?.trim() || null,
      educationGraduationYear: formValues.educationGraduationYear || null
    };

    return {
      searchKey: this.searchTerm.trim(),
      filter,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      pageNumber: this.pageIndex,
      itemsPerPage: this.pageSize
    };
  }

  searchCandidates(): void {
    this.isLoading = true;
    const searchRequest = this.buildSearchRequest();
    
    this.apiService.searchCandidates(searchRequest).subscribe({
      next: (response: CandidateSearchResponse) => {
        console.log('API Response:', response); // Debug log
        this.candidates = response.results;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching candidates:', error);
        this.isLoading = false;
        this.snackBar.open('Error searching candidates. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }



  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  applyFilters(): void {
    this.pageIndex = 0;
    this.searchCandidates();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchCandidates();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterForm.reset();
    this.pageIndex = 0;
    this.searchCandidates();
  }

  hasActiveFilters(): boolean {
    const formValues = this.filterForm.value;
    return this.searchTerm.trim() !== '' ||
           Object.values(formValues).some(value => value && value.toString().trim() !== '');
  }

  getActiveFilterCount(): number {
    const formValues = this.filterForm.value;
    let count = 0;
    
    if (this.searchTerm.trim()) count++;
    Object.values(formValues).forEach(value => {
      if (value && value.toString().trim() !== '') count++;
    });
    
    return count;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.searchCandidates();
  }

  getSkillsText(skills: string[]): string {
    return skills.join(', ');
  }

  viewCandidateDetails(candidateId: string): void {
    this.router.navigateByUrl('/candidate' + `/${candidateId}`);
  }

  navigateToCreate(): void {
    this.router.navigate(['/candidate/create']);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.snackBar.open(`Selected: ${file.name}`, 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    } else {
      this.snackBar.open('Please select a PDF file', 'Close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }

  openFileDialog(): void {
    const fileInput = document.getElementById('resumeUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onUploadResume(): void {
    if (!this.selectedFile) {
      this.snackBar.open('Please select a file first', 'Close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    // Simulate file upload progress
    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.simulateResumeProcessing();
      }
    }, 200);
  }

  private simulateResumeProcessing(): void {
    // Simulate resume processing and candidate profile creation
    setTimeout(() => {
      // In a real implementation, you would call an API to upload and process the resume
      // For now, we'll just refresh the search results
      this.searchCandidates();
      
      this.isUploading = false;
      this.uploadProgress = 0;
      this.selectedFile = null;
      
      // Reset file input
      const fileInput = document.getElementById('resumeUpload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
      this.snackBar.open('Resume uploaded and processed successfully!', 'View', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    }, 1000);
  }

  getTruncatedSummary(summary: string, maxLength: number = 100): string {
    return summary.length > maxLength ? summary.substring(0, maxLength) + '...' : summary;
  }

  private convertToStringArray(value: string | null | undefined): string[] | null {
    if (!value || !value.trim()) {
      return null;
    }
    return value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
  }
}


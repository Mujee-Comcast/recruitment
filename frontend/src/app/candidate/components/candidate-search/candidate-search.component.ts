import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CandidateProfile, CANDIDATE_PROFILES_MOCK_DATA } from '../../../shared/data/candidate-profiles-mock-data';

@Component({
  selector: 'app-candidate-search',
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
    MatButtonModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  templateUrl: './candidate-search.component.html',
  styleUrl: './candidate-search.component.scss'
})
export class CandidateSearchComponent implements OnInit {
  displayedColumns: string[] = [
    'candidateId',
    'candidateName',
    'role',
    'atsScore',
    'profileSummary',
    'overallExperience',
    'primarySkills',
    'secondarySkills',
    'email',
    'mobileNumber'
  ];

  allProfiles: CandidateProfile[] = CANDIDATE_PROFILES_MOCK_DATA;
  filteredProfiles: CandidateProfile[] = [];
  paginatedProfiles: CandidateProfile[] = [];
  searchTerm: string = '';

  // Pagination properties
  pageSize: number = 5;
  pageIndex: number = 0;
  totalItems: number = 0;

  // File upload properties
  selectedFile: File | null = null;
  isUploading: boolean = false;
  uploadProgress: number = 0;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filteredProfiles = [...this.allProfiles];
    this.totalItems = this.filteredProfiles.length;
    this.updatePaginatedData();
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProfiles = [...this.allProfiles];
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredProfiles = this.allProfiles.filter(profile =>
        profile.candidateName.toLowerCase().includes(searchLower) ||
        profile.role.toLowerCase().includes(searchLower) ||
        profile.email.toLowerCase().includes(searchLower) ||
        profile.profileSummary.toLowerCase().includes(searchLower) ||
        profile.primarySkills.some(skill => skill.toLowerCase().includes(searchLower)) ||
        profile.secondarySkills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    this.totalItems = this.filteredProfiles.length;
    this.pageIndex = 0; // Reset to first page when searching
    this.updatePaginatedData();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedData();
  }

  private updatePaginatedData(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProfiles = this.filteredProfiles.slice(startIndex, endIndex);
  }

  getSkillsText(skills: string[]): string {
    return skills.join(', ');
  }

  getAtsScoreClass(score: number): string {
    if (score >= 90) return 'score-excellent';
    if (score >= 80) return 'score-good';
    if (score >= 70) return 'score-average';
    return 'score-poor';
  }

  viewCandidateDetails(candidateId: string): void {
    this.router.navigate(['/candidate', candidateId]);
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
      const newProfile: CandidateProfile = {
        id: 'CAND' + String(this.allProfiles.length + 1).padStart(3, '0'),
        candidateName: 'New Candidate',
        role: 'Software Developer',
        atsScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-99
        profileSummary: 'Profile extracted from uploaded resume. Experienced professional with relevant skills.',
        overallExperience: Math.floor(Math.random() * 8) + 1 + ' years',
        primarySkills: ['JavaScript', 'Python', 'SQL'],
        secondarySkills: ['Git', 'Agile', 'Testing'],
        email: 'newcandidate@email.com',
        mobileNumber: '+1-555-' + String(Math.floor(Math.random() * 9000) + 1000),
        resumeFileName: this.selectedFile!.name,
        uploadDate: new Date(),
        workExperience: [],
        education: [],
        awards: [],
        certifications: []
      };

      this.allProfiles.unshift(newProfile); // Add to beginning of array
      this.onSearchChange(); // Refresh the filtered data
      
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
}


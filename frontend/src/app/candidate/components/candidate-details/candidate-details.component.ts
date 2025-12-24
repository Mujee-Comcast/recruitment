import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ApiService } from '../../../shared/services/api.service';
import { Vacancy } from '../../../shared/interfaces/vacancy.interface';

@Component({
  selector: 'app-candidate-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  candidate: any | null = null; // Use any instead of CandidateProfile to match API response
  candidateId: string | null = null;
  matchingVacancies: Array<Vacancy & { matchScore: number }> = [];
  isLoading: boolean = false;
  
  // Table configuration for matching vacancies
  displayedColumns: string[] = ['jobId', 'jobTitle', 'experience', 'matchScore', 'primarySkills'];
  
  // Pagination for matching vacancies
  pageSize: number = 5;
  pageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.paramMap.get('id');
    if (this.candidateId) {
      this.loadCandidate(this.candidateId);
    } else {
      this.goBack();
    }
  }

  loadCandidate(id: string): void {
    this.isLoading = true;
    this.apiService.getCandidateById(id).subscribe({
      next: (candidate) => {
        console.log('Candidate details API response:', candidate);
        this.candidate = candidate;
        this.isLoading = false;
        this.loadMatchingVacancies();
      },
      error: (error) => {
        console.error('Error loading candidate:', error);
        this.isLoading = false;
        this.snackBar.open('Error loading candidate details. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.goBack();
      }
    });
  }

  private loadMatchingVacancies(): void {
    if (!this.candidate) return;

    // Ensure skills arrays exist (API response format)
    const primarySkills = this.candidate.primarySkills || [];
    const secondarySkills = this.candidate.secondarySkills || [];
    
    const candidateSkills = [
      ...primarySkills,
      ...secondarySkills
    ].map(skill => skill.toLowerCase());

    this.matchingVacancies = []
      .map((vacancy: Vacancy) => {
        const vacancySkills = [
          ...vacancy.primarySkills,
          ...vacancy.secondarySkills
        ].map(skill => skill.toLowerCase());

        // Calculate skill match percentage
        const matchingSkills = candidateSkills.filter(skill => 
          vacancySkills.some(vSkill => vSkill.includes(skill) || skill.includes(vSkill))
        );
        
        const skillMatchScore = matchingSkills.length > 0 
          ? (matchingSkills.length / vacancySkills.length) * 100 
          : 0;

        // Experience match bonus - API response has totalExperience as string
        const candidateYears = this.extractExperienceYears(this.candidate.totalExperience || '0');
        const requiredYears = this.extractExperienceYears(vacancy.experience);
        const experienceMatchScore = candidateYears >= requiredYears ? 20 : 
          candidateYears >= (requiredYears * 0.8) ? 10 : 0;

        const totalScore = Math.min(100, skillMatchScore + experienceMatchScore);

        return {
          ...vacancy,
          matchScore: Math.round(totalScore)
        };
      })
      .filter(vacancy => vacancy.matchScore > 30) // Only show vacancies with >30% match
      .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score descending
  }

  private extractExperienceYears(experience: string): number {
    const match = experience.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  goBack(): void {
    this.router.navigate(['/candidate/search']);
  }

  downloadResume(): void {
    if (this.candidate && this.candidate.resumeLink) {
      window.open(this.candidate.resumeLink, '_blank');
    }
  }

  contactCandidate(): void {
    if (this.candidate) {
      window.open(`mailto:${this.candidate.email}?subject=Job Opportunity`);
    }
  }

  callCandidate(): void {
    if (this.candidate) {
      window.open(`tel:${this.candidate.mobile}`);
    }
  }

  viewVacancyDetails(jobId: string): void {
    this.router.navigate(['/vacancy', jobId]);
  }

  getMatchScoreClass(score: number): string {
    if (score >= 80) return 'match-excellent';
    if (score >= 60) return 'match-good';
    if (score >= 40) return 'match-average';
    return 'match-poor';
  }
}

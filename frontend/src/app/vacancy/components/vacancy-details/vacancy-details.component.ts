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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VacancyResponse } from '../../../shared/interfaces/vacancy-search.interface';
import { ApiService } from '../../../shared/services/api.service';
import { CandidateProfile } from '../../../shared/interfaces/candidate.interface';

@Component({
  selector: 'app-vacancy-details',
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
    MatProgressSpinnerModule
  ],
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.scss']
})
export class VacancyDetailsComponent implements OnInit {
  vacancy: VacancyResponse | null = null;
  vacancyId: string | null = null;
  matchingProfiles: CandidateProfile[] = [];
  paginatedProfiles: CandidateProfile[] = [];
  isLoading: boolean = false;
  
  // Pagination for matching profiles
  pageSize: number = 5;
  pageIndex: number = 0;
  totalProfiles: number = 0;

  displayedColumns: string[] = [
    'candidateName',
    'atsScore',
    'overallExperience',
    'matchingSkills',
    'email'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('id');
    if (this.vacancyId) {
      this.loadVacancy(this.vacancyId);
    } else {
      this.goBack();
    }
  }

  loadVacancy(id: string): void {
    this.isLoading = true;
    
    this.apiService.getVacancyById(id).subscribe({
      next: (vacancy: VacancyResponse) => {
        this.vacancy = vacancy;
        this.findMatchingProfiles();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading vacancy details:', error);
        this.isLoading = false;
        this.goBack();
      }
    });
  }

  findMatchingProfiles(): void {
    if (!this.vacancy) return;

    const requiredSkills = this.vacancy.primarySkills.map((skill: string) => skill.toLowerCase());
    const preferredSkills = this.vacancy.secondarySkills?.map((skill: string) => skill.toLowerCase()) || [];
    const allJobSkills = [...requiredSkills, ...preferredSkills];

    this.matchingProfiles = []
      .map((profile:CandidateProfile) => {
        const candidateSkills = [
          ...profile.primarySkills.map(skill => skill.toLowerCase()),
          ...profile.secondarySkills.map(skill => skill.toLowerCase())
        ];

        const matchingSkillsCount = candidateSkills.filter(skill => 
          allJobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
        ).length;

        const matchingPercentage = (matchingSkillsCount / allJobSkills.length) * 100;

        return {
          ...profile,
          matchingSkillsCount,
          matchingPercentage
        };
      })
      .filter(profile => profile.matchingSkillsCount > 0)
      .sort((a, b) => {
        // Sort by matching percentage first, then by ATS score
        if (b.matchingPercentage !== a.matchingPercentage) {
          return b.matchingPercentage - a.matchingPercentage;
        }
        return b.atsScore - a.atsScore;
      });

    this.totalProfiles = this.matchingProfiles.length;
    this.updatePaginatedProfiles();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedProfiles();
  }

  updatePaginatedProfiles(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProfiles = this.matchingProfiles.slice(startIndex, endIndex);
  }

  getJobLevelClass(level: string): string {
    switch (level.toLowerCase()) {
      case 'entry': return 'level-entry';
      case 'mid': return 'level-mid';
      case 'senior': return 'level-senior';
      case 'lead': return 'level-lead';
      default: return 'level-mid';
    }
  }

  getJobLevelText(level: string): string {
    switch (level.toLowerCase()) {
      case 'entry': return 'Entry Level';
      case 'mid': return 'Mid Level';
      case 'senior': return 'Senior Level';
      case 'lead': return 'Lead Level';
      default: return level;
    }
  }

  getMatchingSkills(profile: any): string[] {
    if (!this.vacancy) return [];

    const requiredSkills = this.vacancy.primarySkills.map((skill: string) => skill.toLowerCase());
    const preferredSkills = this.vacancy.secondarySkills?.map((skill: string) => skill.toLowerCase()) || [];
    const allJobSkills = [...requiredSkills, ...preferredSkills];

    const candidateSkills = [
      ...profile.primarySkills.map((skill: string) => skill.toLowerCase()),
      ...profile.secondarySkills.map((skill: string) => skill.toLowerCase())
    ];

    return candidateSkills.filter(skill => 
      allJobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
    );
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

  goBack(): void {
    this.router.navigate(['/vacancies']);
  }

  shareJob(): void {
    if (this.vacancy) {
      const jobUrl = window.location.href;
      navigator.clipboard.writeText(jobUrl).then(() => {
        // Could add a snackbar notification here
        console.log('Job URL copied to clipboard');
      });
    }
  }

  applyToJob(): void {
    if (this.vacancy) {
      // Simulate job application
      console.log('Applying to job:', this.vacancy.title);
      // In a real app, this would open an application form or redirect to an application page
    }
  }
}

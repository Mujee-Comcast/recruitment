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

import { CandidateProfile, CANDIDATE_PROFILES_MOCK_DATA } from '../shared/data/candidate-profiles-mock-data';
import { Vacancy, VACANCY_MOCK_DATA } from '../shared/data/vacancy-mock-data';

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
    MatPaginatorModule
  ],
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  candidate: CandidateProfile | null = null;
  candidateId: string | null = null;
  matchingVacancies: Array<Vacancy & { matchScore: number }> = [];
  
  // Table configuration for matching vacancies
  displayedColumns: string[] = ['jobId', 'jobTitle', 'experience', 'matchScore', 'primarySkills'];
  
  // Pagination for matching vacancies
  pageSize: number = 5;
  pageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
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
    this.candidate = CANDIDATE_PROFILES_MOCK_DATA.find(profile => profile.id === id) || null;
    if (!this.candidate) {
      this.goBack();
    } else {
      this.loadMatchingVacancies();
    }
  }

  private loadMatchingVacancies(): void {
    if (!this.candidate) return;

    const candidateSkills = [
      ...this.candidate.primarySkills,
      ...this.candidate.secondarySkills
    ].map(skill => skill.toLowerCase());

    this.matchingVacancies = VACANCY_MOCK_DATA
      .map(vacancy => {
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

        // Experience match bonus
        const candidateYears = this.extractExperienceYears(this.candidate!.overallExperience);
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
    this.router.navigate(['/profiles']);
  }

  getScoreClass(score: number): string {
    if (score >= 90) return 'score-excellent';
    if (score >= 80) return 'score-good';
    if (score >= 70) return 'score-average';
    return 'score-poor';
  }

  getScoreLabel(score: number): string {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Average';
    return 'Poor';
  }

  downloadResume(): void {
    if (this.candidate) {
      // Simulate resume download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${this.candidate.candidateName}_Resume.pdf`;
      link.click();
    }
  }

  contactCandidate(): void {
    if (this.candidate) {
      window.open(`mailto:${this.candidate.email}?subject=Job Opportunity`);
    }
  }

  callCandidate(): void {
    if (this.candidate) {
      window.open(`tel:${this.candidate.mobileNumber}`);
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

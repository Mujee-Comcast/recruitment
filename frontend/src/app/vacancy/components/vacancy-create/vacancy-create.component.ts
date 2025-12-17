import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Vacancy } from '../../../shared/data/vacancy-mock-data';

@Component({
  selector: 'app-vacancy-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './vacancy-create.component.html',
  styleUrl: './vacancy-create.component.scss'
})
export class VacancyCreateComponent implements OnInit {
  vacancyForm!: FormGroup;
  primarySkills: string[] = [];
  secondarySkills: string[] = [];
  isSubmitting = false;

  // Dropdown options
  jobLevels: string[] = [
    'Junior',
    'Mid-Level', 
    'Senior',
    'Lead',
    'Principal',
    'Director'
  ];

  experienceRanges: string[] = [
    '0-1 years',
    '1-2 years',
    '2-3 years',
    '3-5 years',
    '4-6 years',
    '5-7 years',
    '5-8 years',
    '6-8 years',
    '8+ years',
    '10+ years'
  ];

  recruiters: string[] = [
    'John Smith',
    'Sarah Johnson',
    'Mike Davis',
    'Emily Chen',
    'Lisa Wang',
    'David Brown',
    'Anna Rodriguez',
    'Tom Wilson',
    'Jessica Taylor',
    'Robert Anderson'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.vacancyForm = this.fb.group({
      jobTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      jobDescription: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(1000)]],
      jobLevel: ['', Validators.required],
      experience: ['', Validators.required],
      openPositions: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      recruiter: ['', Validators.required],
      primarySkillsInput: [''],
      secondarySkillsInput: ['']
    });
  }

  // Skills Management
  addPrimarySkill(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    const skillInput = this.vacancyForm.get('primarySkillsInput');
    if (skillInput) {
      const skill = skillInput.value?.trim();
      if (skill && !this.primarySkills.includes(skill)) {
        this.primarySkills.push(skill);
        skillInput.setValue('');
      }
    }
  }

  removePrimarySkill(index: number) {
    this.primarySkills.splice(index, 1);
  }

  addSecondarySkill(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    const skillInput = this.vacancyForm.get('secondarySkillsInput');
    if (skillInput) {
      const skill = skillInput.value?.trim();
      if (skill && !this.secondarySkills.includes(skill)) {
        this.secondarySkills.push(skill);
        skillInput.setValue('');
      }
    }
  }

  removeSecondarySkill(index: number) {
    this.secondarySkills.splice(index, 1);
  }

  onPrimarySkillKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addPrimarySkill();
    }
  }

  onSecondarySkillKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addSecondarySkill();
    }
  }

  addSkillFromSuggestion(skill: string, type: 'primary' | 'secondary') {
    if (type === 'primary') {
      if (!this.primarySkills.includes(skill)) {
        this.primarySkills.push(skill);
      }
    } else {
      if (!this.secondarySkills.includes(skill) && !this.primarySkills.includes(skill)) {
        this.secondarySkills.push(skill);
      }
    }
  }

  // Form validation helpers
  getFieldErrorMessage(fieldName: string): string {
    const field = this.vacancyForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors?.['minlength']?.requiredLength;
      return `${this.getFieldDisplayName(fieldName)} must be at least ${requiredLength} characters`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors?.['maxlength']?.requiredLength;
      return `${this.getFieldDisplayName(fieldName)} must not exceed ${requiredLength} characters`;
    }
    if (field?.hasError('min')) {
      return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors?.['min']?.min}`;
    }
    if (field?.hasError('max')) {
      return `${this.getFieldDisplayName(fieldName)} must not exceed ${field.errors?.['max']?.max}`;
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const fieldNames: { [key: string]: string } = {
      'jobTitle': 'Job Title',
      'jobDescription': 'Job Description',
      'jobLevel': 'Job Level',
      'experience': 'Experience Required',
      'openPositions': 'Open Positions',
      'recruiter': 'Recruiter'
    };
    return fieldNames[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.vacancyForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.vacancyForm.valid) {
      if (this.primarySkills.length === 0) {
        alert('Please add at least one primary skill');
        return;
      }

      this.isSubmitting = true;

      const vacancyData = {
        jobTitle: this.vacancyForm.value.jobTitle,
        jobDescription: this.vacancyForm.value.jobDescription,
        jobLevel: this.vacancyForm.value.jobLevel,
        experience: this.vacancyForm.value.experience,
        openPositions: parseInt(this.vacancyForm.value.openPositions),
        recruiter: this.vacancyForm.value.recruiter,
        primarySkills: [...this.primarySkills],
        secondarySkills: [...this.secondarySkills]
      };

      // Simulate API call
      setTimeout(() => {
        console.log('Vacancy created:', vacancyData);
        this.isSubmitting = false;
        
        // Show success message or navigate
        alert('Vacancy created successfully!');
        this.router.navigate(['/vacancy']);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      this.vacancyForm.markAllAsTouched();
      alert('Please fix the validation errors before submitting');
    }
  }

  onCancel() {
    this.router.navigate(['/vacancy/search']);
  }
}
  
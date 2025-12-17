import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { WorkExperience, Education } from '../../../shared/data/candidate-profiles-mock-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-candidate-create',
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './candidate-create.component.html',
  styleUrl: './candidate-create.component.scss'
})
export class CandidateCreateComponent implements OnInit {
  candidateForm!: FormGroup;
  primarySkills: string[] = [];
  secondarySkills: string[] = [];
  selectedFile: File | null = null;
  currentCandidate: any = null;
  isDragOver = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.candidateForm = this.fb.group({
      candidateName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[+]?[1-9]\d{1,14}$/)]],
      role: ['', Validators.required],
      overallExperience: ['', Validators.required],
      profileSummary: ['', [Validators.required, Validators.minLength(50)]],
      primarySkillsInput: [''],
      secondarySkillsInput: [''],
      workExperience: this.fb.array([this.createWorkExperienceGroup()]),
      education: this.fb.array([this.createEducationGroup()])
    });
  }

  private createWorkExperienceGroup(): FormGroup {
    return this.fb.group({
      company: [''],
      position: [''],
      startDate: [''],
      endDate: [''],
      description: [''],
      technologies: [[]]
    });
  }

  private createEducationGroup(): FormGroup {
    return this.fb.group({
      institution: [''],
      degree: [''],
      field: [''],
      graduationYear: [''],
      grade: ['']
    });
  }

  get workExperienceControls() {
    return (this.candidateForm.get('workExperience') as FormArray).controls as FormGroup[];
  }

  get educationControls() {
    return (this.candidateForm.get('education') as FormArray).controls as FormGroup[];
  }

  // Skills Management
  addPrimarySkill(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    const skillInput = this.candidateForm.get('primarySkillsInput');
    if (skillInput) {
      const skill = skillInput.value?.trim();
      
      if (skill && !this.primarySkills.includes(skill)) {
        this.primarySkills.push(skill);
        skillInput.setValue('');
      }
    }
  }

  addPrimarySkillFromButton() {
    this.addPrimarySkill();
  }

  removePrimarySkill(index: number) {
    this.primarySkills.splice(index, 1);
  }

  addSecondarySkill(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    const skillInput = this.candidateForm.get('secondarySkillsInput');
    if (skillInput) {
      const skill = skillInput.value?.trim();
      
      if (skill && !this.secondarySkills.includes(skill)) {
        this.secondarySkills.push(skill);
        skillInput.setValue('');
      }
    }
  }

  addSecondarySkillFromButton() {
    this.addSecondarySkill();
  }

  removeSecondarySkill(index: number) {
    this.secondarySkills.splice(index, 1);
  }

  // Mobile number validation
  onMobileKeyPress(event: KeyboardEvent) {
    const char = event.key;
    const currentValue = (event.target as HTMLInputElement).value;
    
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (event.keyCode === 65 && event.ctrlKey === true) ||
        (event.keyCode === 67 && event.ctrlKey === true) ||
        (event.keyCode === 86 && event.ctrlKey === true) ||
        (event.keyCode === 88 && event.ctrlKey === true)) {
      return;
    }
    
    // Allow + only at the beginning
    if (char === '+' && currentValue.length === 0) {
      return;
    }
    
    // Allow only numbers
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }

  // File Upload Management
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.validateAndSetFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.validateAndSetFile(file);
    }
  }

  private validateAndSetFile(file: File) {
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      alert('Please select a PDF or DOC file.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size should be less than 10MB.');
      return;
    }

    this.selectedFile = file;
    const formData = new FormData();
    formData.append('file', file);

    const token = "test";

    this.http.post('http://localhost:8080/api/candidate/upload', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).subscribe((response:any) => {
      this.currentCandidate = { candidateID: response.candidateID, resumeFileUrl: response.fileUrl };
      console.log('File uploaded successfully', response);
    }, error => {
      console.error('File upload failed', error);
    });
  }

  removeFile() {
    this.selectedFile = null;
  }

  // Work Experience Management
  addWorkExperience() {
    const workExperienceArray = this.candidateForm.get('workExperience') as FormArray;
    workExperienceArray.push(this.createWorkExperienceGroup());
  }

  removeWorkExperience(index: number) {
    const workExperienceArray = this.candidateForm.get('workExperience') as FormArray;
    if (workExperienceArray.length > 1) {
      workExperienceArray.removeAt(index);
    }
  }

  // Education Management
  addEducation() {
    const educationArray = this.candidateForm.get('education') as FormArray;
    educationArray.push(this.createEducationGroup());
  }

  removeEducation(index: number) {
    const educationArray = this.candidateForm.get('education') as FormArray;
    if (educationArray.length > 1) {
      educationArray.removeAt(index);
    }
  }

  // Form Submission
  onSubmit() {
    if (this.candidateForm.valid && this.primarySkills.length > 0) {
      this.isSubmitting = true;
      
      const formData = this.candidateForm.value;
      const candidateProfile = {
        candidateName: formData.candidateName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        role: formData.role,
        overallExperience: formData.overallExperience,
        profileSummary: formData.profileSummary,
        primarySkills: this.primarySkills,
        secondarySkills: this.secondarySkills,
        workExperience: formData.workExperience.filter((exp: WorkExperience) => exp.company),
        education: formData.education.filter((edu: Education) => edu.institution),
        awards: [],
        certifications: [],
        resumeFileName: this.selectedFile?.name,
      };

      // Simulate API call
      setTimeout(() => {
        console.log('Candidate Profile Created:', candidateProfile);
        this.isSubmitting = false;
        alert('Candidate created successfully!');
        this.router.navigate(['/candidate']);
      }, 2000);
    } else {
      this.markFormGroupTouched();
      if (this.primarySkills.length === 0) {
        alert('Please add at least one primary skill.');
      }
    }
  }

  onCancel() {
    if (this.candidateForm.dirty) {
      const confirmed = confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (confirmed) {
        this.router.navigate(['/candidate/search']);
      }
    } else {
      this.router.navigate(['/candidate/search']);
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.candidateForm.controls).forEach(key => {
      const control = this.candidateForm.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormArray) {
        control.controls.forEach(subControl => {
          if (subControl instanceof FormGroup) {
            Object.keys(subControl.controls).forEach(subKey => {
              subControl.get(subKey)?.markAsTouched();
            });
          }
        });
      }
    });
  }

  parseResume() {

    const formData = new FormData();
    formData.append('fileUrl', this.currentCandidate?.resumeFileUrl || '');
    formData.append('candidateID', this.currentCandidate?.candidateID || '');

    const token = "test";

    this.http.post<any>('http://localhost:8080/api/candidate/parse-resume', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).subscribe(response => {
      console.log('Resume parsed successfully', response);
      
    });
  }
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
  grade?: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export interface Certification {
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface CandidateProfile {
  id: string;
  candidateName: string;
  role: string;
  atsScore: number;
  profileSummary: string;
  overallExperience: string;
  primarySkills: string[];
  secondarySkills: string[];
  email: string;
  mobileNumber: string;
  resumeFileName?: string;
  uploadDate?: Date;
  workExperience: WorkExperience[];
  education: Education[];
  awards: Award[];
  certifications: Certification[];
}
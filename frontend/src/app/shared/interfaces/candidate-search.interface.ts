export interface CandidateSearchFilter {
  candidateId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  mobile?: string | null;
  role?: string | null;
  totalExperience?: number | null;
  primarySkills?: string[] | null;
  secondarySkills?: string[] | null;
  summary?: string | null;
  certifications?: string | null;
  resumeLink?: string | null;
  experienceCompany?: string | null;
  experiencePosition?: string | null;
  experienceStartDate?: string | null;
  experienceEndDate?: string | null;
  educationInstitution?: string | null;
  educationDegree?: string | null;
  educationFieldOfStudy?: string | null;
  educationGraduationYear?: number | null;
}

export interface CandidateSearchRequest {
  searchKey: string;
  filter: CandidateSearchFilter;
  sortField: string;
  sortOrder: 'ASC' | 'DESC';
  pageNumber: number;
  itemsPerPage: number;
}

export interface CandidateSearchResponse {
  results: any[]; // The candidates array
  total: number; // Total number of candidates
  totalPages: number;
  pageNumber: number;
  itemsPerPage: number;
  appliedFilters: CandidateSearchFilter;
  sortField: string;
  sortOrder: string;
  hasPrevious: boolean;
  hasNext: boolean;
  searchKey: string;
}
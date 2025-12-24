export interface VacancySearchRequest {
  searchKey: string;
  filter: VacancySearchFilter;
  sortField: string;
  sortOrder: 'ASC' | 'DESC';
  pageNumber: number;
  itemsPerPage: number;
}

export interface VacancySearchFilter {
  vacancyID?: string | null;
  title?: string | null;
  description?: string | null;
  level?: string | null;
  experience?: string | null;
  openPositions?: number | null;
  recruiter?: string | null;
  primarySkills?: string[] | null;
  secondarySkills?: string[] | null;
}

export interface VacancySearchResponse {
  total: number;
  pageNumber: number;
  appliedFilters: VacancySearchFilter;
  itemsPerPage: number;
  sortOrder: string;
  totalPages: number;
  sortField: string;
  hasPrevious: boolean;
  hasNext: boolean;
  searchKey: string;
  results: VacancyResponse[];
}

export interface VacancyCreateRequest {
  title: string;
  description: string;
  level: string;
  experience: number;
  openPositions: number;
  recruiter: string;
  primarySkills: string[];
  secondarySkills: string[];
}

export interface VacancyResponse {
  id: string;
  vacancyID: string;
  title: string;
  description: string;
  level: string;
  experience: number;
  openPositions: number;
  recruiter: string;
  primarySkills: string[];
  secondarySkills: string[];
  allSkills: string;
  searchableContent: string;
}
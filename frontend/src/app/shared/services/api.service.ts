import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CandidateSearchRequest, CandidateSearchResponse } from '../interfaces/candidate-search.interface';
import { VacancyResponse, VacancySearchRequest, VacancySearchResponse, VacancyCreateRequest } from '../interfaces/vacancy-search.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Generic GET method
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  // Generic POST method
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  // Generic PUT method
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  // Generic DELETE method
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }

  // Example specific methods for candidates
  searchCandidates(searchRequest: CandidateSearchRequest): Observable<CandidateSearchResponse> {
    return this.post<CandidateSearchResponse>('search/candidate', searchRequest);
  }

  // Example specific methods for vacancies
  searchVacancies(searchRequest: VacancySearchRequest): Observable<VacancySearchResponse> {
    return this.post<VacancySearchResponse>('search/vacancy', searchRequest);
  }

  getCandidates(): Observable<any[]> {
    return this.get<any[]>('candidates');
  }

  getCandidateById(id: string): Observable<any> {
    return this.get<any>(`candidate/${id}`);
  }

  createCandidate(candidate: any): Observable<any> {
    return this.post<any>('candidates', candidate);
  }

  updateCandidate(id: string, candidate: any): Observable<any> {
    return this.put<any>(`candidates/${id}`, candidate);
  }

  deleteCandidate(id: string): Observable<any> {
    return this.delete<any>(`candidates/${id}`);
  }

  // Example specific methods for vacancies
  getVacancies(): Observable<any[]> {
    return this.get<any[]>('vacancies');
  }

  getVacancyById(id: string): Observable<VacancyResponse> {
    return this.get<VacancyResponse>(`vacancy/${id}`);
  }

  createVacancy(vacancy: VacancyCreateRequest): Observable<VacancyResponse> {
    return this.post<VacancyResponse>('vacancy/create', vacancy);
  }

  updateVacancy(id: string, vacancy: any): Observable<any> {
    return this.put<any>(`vacancies/${id}`, vacancy);
  }

  deleteVacancy(id: string): Observable<any> {
    return this.delete<any>(`vacancies/${id}`);
  }

  // Candidate specific API methods
  uploadCandidateResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.post<any>('candidate/upload', formData);
  }

  createCandidateProfile(candidate: any): Observable<any> {
    return this.post<any>('candidate/create', candidate);
  }

  parseResume(fileUrl: string, candidateID: string): Observable<any> {
    const formData = new FormData();
    formData.append('fileUrl', fileUrl);
    formData.append('candidateID', candidateID);
    
    return this.post<any>('candidate/parse-resume', formData);
  }
}
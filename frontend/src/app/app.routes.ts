import { Routes } from '@angular/router';
import { CandidateDetailsComponent } from './candidate/components/candidate-details/candidate-details.component';
import { VacancyDetailsComponent } from './vacancy/components/vacancy-details/vacancy-details.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { VacancySearchComponent } from './vacancy/components/vacancy-search/vacancy-search.component';
import { VacancyCreateComponent } from './vacancy/components/vacancy-create/vacancy-create.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateCreateComponent } from './candidate/components/candidate-create/candidate-create.component';
import { CandidateSearchComponent } from './candidate/components/candidate-search/candidate-search.component';
import { VacancyUploadComponent } from './vacancy/components/vacancy-upload/vacancy-upload.component';

export const routes: Routes = [
  {
    path: 'vacancy', component: VacancyComponent,
    children: [
      { path: 'search', component: VacancySearchComponent },
      { path: 'create', component: VacancyCreateComponent },
      { path: ':id', component: VacancyDetailsComponent },
      { path: 'upload', component: VacancyUploadComponent }
    ]
  },
  {
    path: 'candidate', component: CandidateComponent,
    children: [
      { path: 'search', component: CandidateSearchComponent },
      { path: 'create', component: CandidateCreateComponent },
      { path: ':id', component: CandidateDetailsComponent }
    ]
  },
  { path: '**', redirectTo: '/vacancy' }
];

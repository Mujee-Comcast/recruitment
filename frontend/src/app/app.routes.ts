import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'candidate/:id', component: CandidateDetailsComponent },
  { path: 'vacancy/:id', component: VacancyDetailsComponent },
  { path: '**', redirectTo: '/dashboard' }
];

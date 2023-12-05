import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AboutComponent } from './about/about.component';
import { JobAddFormComponent } from './job-add-form/job-add-form.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'jobs/add', component: JobAddFormComponent},
  {path: 'jobs/:id', component: JobDetailsComponent},
  {path: 'jobs', component: JobListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

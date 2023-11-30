import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';
import { HttpClientModule } from '@angular/common/http';
import { JobService } from './services/job.service';
import { JobAddFormComponent } from './job-add-form/job-add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DaysAgoPipe } from './pipes/days-ago.pipe';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    JobAddFormComponent,
    DaysAgoPipe,
    HomeComponent,
    JobDetailsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }

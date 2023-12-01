import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {

  jobDetails: any = null;
  error = null;
  errorMessage : string = "";

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // extraire le paramètre id de l'URL actuelle avec ActivatedRoute
    const id = this.activatedRoute.snapshot.params['id']; 

    this.jobService.getJob(id)
      .subscribe({
        next: data => {
          this.handleServerRespons(data);
        },
        error: err => {
          this.handleError(err);
        }
      })
  }

  handleServerRespons(response: any) {
    if (response.success) {
      this.jobDetails = response.job; // voir api.get dans server.js
    } else {
      this.errorMessage = response.message; // voir api.get ds server.js
    }
  }

  handleError(err: any) {
    this.error = err;
  }
}

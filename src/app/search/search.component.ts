import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  jobs: any = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {

  }

  searchJobs(searchData: string) {
    this.jobService.searchJob(searchData)
      .subscribe({
        next: data => {
          this.jobs = data;
        },
        error: error => {
          console.error(error);
        }
      });
  }

}

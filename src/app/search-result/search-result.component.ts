import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {

  jobs: any = [];
  msg = '';

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.searchResultSubject.subscribe({
      next: data => { this.handleSearchResult(data) },
      error: err => { console.error(err) }
    });
  }

  handleSearchResult(data: any) {
    console.log(data);
    if (data.message) {
      this.jobs = [];
      console.log(data.message);
      this.msg = data.message || 'Aucun résultat trouvé.';
    } else {
      this.jobs = data.jobs;
    }
  }
}

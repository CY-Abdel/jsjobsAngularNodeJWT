import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// Importez l'opérateur map depuis 'rxjs/operators'.
import { map } from 'rxjs/operators';
import { JobService } from '../services/job.service';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {

  // Déclarez une propriété jobs pour stocker les données
  jobs: any = [];
  err: string = "";

  constructor(private jobService: JobService) { }

  // Implémentez la méthode ngOnInit de l'interface OnInit

  ngOnInit() {
    const jbbTokenString = localStorage.getItem('jbb-data');
  
    if (jbbTokenString !== null) {
      const jbbToken = JSON.parse(jbbTokenString);
  
      this.jobService.getJobs(jbbToken.token)
        .subscribe({
          next: data => {
            this.jobs = data;
            // console.log('Data received:', data);
          },
          error: error => {
            this.err = error;
            // console.error('Observable emitted an error: ' + error)
          }
        });
  
      this.jobService.JobsSubject
        .subscribe({
          next: data => {
            // console.log(data);
            this.jobs = [data, ...this.jobs];
          }
        });
    } else {
      console.error("La clé 'jbb-data' n'a pas été trouvée dans le stockage local.");
    }
  }
  

  // ngOnInit() {
  //   this.jobService.getJobs()
  //     .subscribe({
  //       next: data => {
  //         this.jobs = data;
  //         // console.log('Data received:', data);
  //       },
  //       error: error => {
  //         this.err = error;
  //         // console.error('Observable emitted an error: ' + error)
  //       }
  //     });

  //   this.jobService.JobsSubject
  //     .subscribe({
  //       next: data => {
  //         // console.log(data);
  //         this.jobs = [data, ...this.jobs];
  //       }
  //     })
  // }

}


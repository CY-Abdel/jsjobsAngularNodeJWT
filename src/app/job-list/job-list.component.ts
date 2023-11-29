import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// Importez l'opérateur map depuis 'rxjs/operators'.
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {

  // Déclarez une propriété jobs pour stocker les données
  jobs: any = [];

  // Déclarez le constructeur du composant et injectez le service HttpClient.
  constructor(private http: HttpClient) { }

  // Implémentez la méthode ngOnInit de l'interface OnInit
  ngOnInit() {
    this.http.get('data/jobs.json')
      // Utilisez l'opérateur pipe pour combiner des opérations RxJS.
      .pipe(
        // Utilisez l'opérateur map pour traiter les données de la réponse.
        map(
          (res: any) => {
            console.log(res);
            this.jobs = res;
          })
      )
      // Abonnez-vous à l'observable résultant de la requête HTTP.
      .subscribe();
  }
}


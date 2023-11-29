import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>('../../data/jobs.json')
      .pipe(
        map((res: any) => {
          console.log(res);
          return res; // Assurez-vous de retourner les données dans la fonction map.
        })
      );
  }

  // getJobs() {
  //   return this.http.get('../../data/jobs.json')
  //     // Utilisez l'opérateur pipe pour combiner des opérations RxJS.
  //     .pipe(
  //       // Utilisez l'opérateur map pour traiter les données de la réponse.
  //       map(
  //         (res: any) => {
  //           console.log(res);
  //           return res;
  //         })
  //     );
  //   // Abonnez-vous à l'observable résultant de la requête HTTP.
  //   // .subscribe();
  // }

}

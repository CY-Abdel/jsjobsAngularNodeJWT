import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  jobs: any = [];
  initialJobs: any = [];
  JobsSubject = new Subject();

  //resultat de recherche
  searchResultSubject = new Subject();


  // conecter back et front
  BASE_URL = 'http://localhost:4201';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getJobs(token : any) {
    const headers = this.authService.addAuthorizationHeader(token);
    
    return this.http.get(`${this.BASE_URL}/api/jobs`, headers )
      .pipe(
        map((res: any) => {
          // console.log(res);
          return res;
        })
      );
  }

  getJobsByUserEmail(userEmail: string) {
    return this.http.get(this.BASE_URL + `/api/jobs/${userEmail}`)
      .pipe(
        map(res => { return res; })
      );
  }

  addJob(jobData: any, token: any) {
    console.log('add job');
    jobData.id = Date.now();
    // this.jobs = [jobData, ...this.jobs];
    // return this.JobsSubject.next(jobData);

    const headers = this.authService.addAuthorizationHeader(token);

    return this.http.post(this.BASE_URL + '/api/jobs', jobData, headers)
      .pipe(
        map((res) => {
          this.JobsSubject.next(jobData);
          console.log(res);
        })
      );
  }

  // GetJob By Id
  getJob(id: number | string) {
    return this.http.get(this.BASE_URL + `/api/jobs/${id}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // fonction mais pas si les champs sont vides
  /** 
  // searchJob(criteria: any) {
  //   console.log(criteria);
  //   return this.http.get(`${this.BASE_URL}api/search/${criteria.term}/${criteria.place}`)
  //     .pipe(
  //       map((res: any) => {
  //         res.json();
  //       })
  //     )
  // }
  */

  searchJob(criteria: any) {
    const term = criteria.term ? `/${criteria.term}` : '';
    const place = criteria.place ? `/${criteria.place}` : '';

    return this.http.get(`${this.BASE_URL}/api/search${term}${place}`)
      .pipe(
        map((res: any) => res),
        tap(res => this.searchResultSubject.next(res))
      );
  }
}

// getJobs(): Observable<any> {
//   if (this.jobs.length > 0 && this.initialJobs.length > 0) {
//     // Si les deux tableaux ont déjà des données, les fusionner et les renvoyer.
//     console.log('case if');
//     return of([...this.jobs, ...this.initialJobs]);
//   }
//   else if (this.jobs.length > 0 && this.initialJobs.length === 0) {
//     console.log('case else if');
//     // return this.http.get<any[]>('../../data/jobs.json')
//     return this.http.get(this.BASE_URL + 'api/jobs ')
//       .pipe(
//         map((res: any) => {
//           console.log(res);
//           return res;
//         }),
//         tap((data) => {
//           this.initialJobs = data;
//           this.jobs = [...this.jobs, ...this.initialJobs];
//         }),
//       );
//   }
//   else {
//     // Si les deux tableaux sont vides, récupérer des données depuis le fichier JSON.
//     console.log('case else');
//     // return this.http.get('../../data/jobs.json')
//     return this.http.get(this.BASE_URL + 'api/jobs ')
//       .pipe(
//         map((res: any) => {
//           console.log(res);
//           return res;
//         }),
//         tap((data: any) => {
//           this.initialJobs = data;
//         }),
//       );
//   }
// }

/** Amngular 4 marche pas ici avec 17 */
// getJobs() {
//   if (this.jobs.length > 0 && this.initialJobs.length > 0) {
//     console.log('case if');
//     return Observable.of([...this.jobs, this.initialJobs])
//   } else if (this.jobs.length > 0 && this.initialJobs.length ==== 0){
//     console.log('case esle if');
//     return this.http.get('../../data/jobs.json')
//       .pipe(
//         map((res: any) => {
//           console.log(res);
//           // return res; // Assurez-vous de retourner les données dans la fonction map.
//         })
//           .do(data => {
//             this.initialJobs = data;
//             this.jobs = [...this.jobs, ...this.initialJobs];
//           })
//       );
//   } else {
//     return this.http.get('../../data/jobs.json')
//       // Utilisez l'opérateur pipe pour combiner des opérations RxJS.
//       .pipe(
//         // Utilisez l'opérateur map pour traiter les données de la réponse.
//         map(
//           (res: any) => {
//             console.log(res);
//             return res;
//           }
//         )
//         .do (
//           (data: any) => {
//             this.initialJobs = data;
//             return data;
//           }
//         )
//     );
//   }
// }


// getJobs(): Observable<any[]> {
//   // cas données data json + addJob from Formulalire
//   // cas pas récupéré de donnée
//   // cas job existe
//   return this.http.get<any[]>('../../data/jobs.json')
//     .pipe(
//       map((res: any) => {
//         console.log(res);
//         return res; // Assurez-vous de retourner les données dans la fonction map.
//       })
//     );
// }

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



// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  decodeToken: any = null;
  isAdmin = false;

  userEmail = '';
  jobs : any = [];
  jobsTitle : string = "";


  constructor(private authService: AuthService, private jobService: JobService) { }

  ngOnInit(): void {
    if (this.authService.userIsLoggedIn()) {

      const jbbTokenString = localStorage.getItem('jbb-data');

      if (jbbTokenString !== null) {
        const jbbToken = JSON.parse(jbbTokenString);

        this.decodeToken = this.authService.decodeToken(jbbToken.token);

        console.log('token de proile : ', this.decodeToken);

        if (this.decodeToken && this.decodeToken.role === 'admin') {
          this.isAdmin = true;
        }

        this.userEmail = this.decodeToken.email; // recupere le mail depuis le token

        // Admin doit voir tous
        if (this.isAdmin) {
          this.loadJobsSansFiltre();
        } else {
          this.loadJobs(this.userEmail);
        }
      } else {
        console.error("token 'jbb-data' n'a pas été trouvée dans le stockage local.");
      }
    }
  }

  // elle appel la methode get jobs by email from jobServices
  loadJobs(userEmail: string) {
    this.jobService.getJobsByUserEmail(userEmail)
      .subscribe({
        next: data => this.displayJobs(data.jobs),
        error: err => console.error(err)
      });
  }

  loadJobsSansFiltre() {
    const jbbTokenString = localStorage.getItem('jbb-data');

    if (jbbTokenString !== null) {
      const jbbToken = JSON.parse(jbbTokenString);

      this.jobService.getJobs(jbbToken.token)
        .subscribe({
          next: data => {
            this.displayJobs(data);
          },
          error: error => {
            console.error(error);
          }
        });
    } else {
      console.error("token 'jbb-data' n'a pas été trouvée dans le stockage local.");
    }
  }

  displayJobs(data: any) {
    console.log(data);
    this.jobs = data;

    switch(this.jobs.length) {
      case 0 :
        this.jobsTitle = "Aucune annonce n'a été postée à ce jour";
        return;
      case 1 :
        this.jobsTitle = "Una annonce postée";
        return;
      default : 
        this.jobsTitle = `${this.jobs.length} annonces postées`;
    }
  }



  //*** ne marche pas car pas d'authentication */
  // loadJobsSansFiltre() {
  //   this.jobService.getJobs()
  //     .subscribe({
  //       next: data => {
  //         this.displayJobs(data)
  //       },
  //       error: error => {
  //         console.error(error)
  //       }
  //     });
  // }

}

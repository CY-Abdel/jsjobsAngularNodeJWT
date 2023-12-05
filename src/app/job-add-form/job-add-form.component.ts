import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { JobService } from '../services/job.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-job-add-form',
  templateUrl: './job-add-form.component.html',
  styleUrl: './job-add-form.component.css'
})
export class JobAddFormComponent implements OnInit {

  // menu deroulant
  contratTypes = [
    { id: 1, name: "stage", value: "internship" },
    { id: 2, name: "CDI", value: "permanent" },
    { id: 3, name: "CDD", value: "terme fixe" },
    { id: 4, name: "AutoEntrepreneur", value: "freelance" },
    { id: 5, name: "intérim", value: "temporaire" }
  ]

  // input radio
  currencies = [
    { id: 1, name: 'euros', value: 'EU', symbol: '€' },
    { id: 2, name: 'livres sterling', value: 'POUNDS', symbol: '£' },
    { id: 3, name: 'francs CFA', value: 'CFA', symbol: 'CFA' },
    { id: 4, name: 'dollars canadien', value: 'CAD', symbol: '$' }
  ];

  statuses = [
    { id: 1, name: 'cadre', value: 'executive' },
    { id: 1, name: 'employé', value: 'employee' }
  ];

  experience = [
    { id: 1, name: 'junior', value: 'junior' },
    { id: 2, name: 'medior', value: 'medior' },
    { id: 3, name: 'senior', value: 'senior' }
  ];

  areas = [
    { id: 1, name: 'aucun déplacements', value: 'none' },
    { id: 2, name: 'déplacements régionaux', value: 'region' },
    { id: 3, name: 'déplacements nationaux', value: 'nation' },
    { id: 4, name: 'déplacements internationaux', value: 'international' }
  ];

  form!: FormGroup;

  userIsLoggedIn = false;

  constructor(private formBuilder: FormBuilder, private jobService: JobService, private authService: AuthService) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "id": -1,
      "title": "",
      "company": "",
      "city": "",
      "zipcode": 35,
      "description": "",
      "contract": "",
      "salary": null,
      "currency": "",
      "startdate": new Date(),
      "experience": "",
      "status": "",
      "area": "",
      "field": "",
      "publishdate": new Date(),
      "lastupdate": new Date()
    });

    this.checkUserIsLoggedIn();
  }

  // createJob(jobData: any) {
  //   const token = JSON.parse(localSto«rage.getItem('jbb-data')).token;
  //   this.jobService.addJob(jobData, token).subscribe();

  //   // vider le formulaire apres le post => reset()
  //   this.form.reset();
  // }

  createJob(jobData: any) {
    // Récupérer les données du local storage
    const localStorageDataString = localStorage.getItem('jbb-data');

    // Vérifier si les données existent
    if (localStorageDataString !== null) {
      const localStorageData = JSON.parse(localStorageDataString);

      // Vérifier si la propriété token est définie
      if (localStorageData && localStorageData.token) {
        const token = localStorageData.token;

        // Appeler le service avec le token
        this.jobService.addJob(jobData, token).subscribe();

      }
    }
    // vider le formulaire apres le post => reset()
    this.form.reset();
  }

  checkUserIsLoggedIn() {
    if (this.authService.userIsLoggedIn()) {
      this.userIsLoggedIn = true;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-job-add-form',
  templateUrl: './job-add-form.component.html',
  styleUrl: './job-add-form.component.css'
})
export class JobAddFormComponent implements OnInit {

  form!: FormGroup;

  // menu deroulant
  contratTypes = [
    {
      id: 1, name: "stage", value: "internship",
    },
    {
      id: 2, name: "CDI", value: "permanent",
    },
    {
      id: 3, name: "CDD", value: "terme fixe",
    },
    {
      id: 4, name: "AutoEntrepreneur", value: "freelance",
    },
    {
      id: 5, name: "intérim", value: "temporaire",
    }
  ]

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "id": -1,
      "title": "",
      "company": "",
      "city": "",
      "zipcode": 35,
      "description": "",
      "contract": "",
      "salary": 0,
      "currency": "euros",
      "startdate": new Date(),
      "experience": "",
      "status": "",
      "area": "",
      "field": "",
      "publishdate": new Date(),
      "lastupdate": new Date()
    });
  }

  createJob() {
    console.log(this.form.value);
  }

}

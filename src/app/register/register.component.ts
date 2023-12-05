import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  email: any;
  password: any;
  confirm_password: any;

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {

  }

  register(formData: any) {
    this.authService.register(formData);
  }

}

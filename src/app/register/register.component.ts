import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  email!: any;
  password!: any;
  confirm_password!: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {

  }

  register(formData: any) {
    this.authService.register(formData)
      .subscribe({
        next: data => { this.handleLoginSuccess(data) },
        error: err => { this.handleLoginFailure(err) }
      });
  }

  handleLoginSuccess(data: any) {
    console.log('success ', data);
    // localStorage.setItem('jbb-data', JSON.stringify(data));
  }

  handleLoginFailure(err: any) {
    console.log('failure ', err);
  }

}

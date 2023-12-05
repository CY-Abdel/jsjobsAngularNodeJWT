import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  email!: any;
  password!: any;
  confirm_password!: any;

  constructor(public authService: AuthService, private router: Router) { }

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
    this.router.navigate(['/login']);
  }

  handleLoginFailure(err: any) {
    console.log('failure ', err);
  }

}

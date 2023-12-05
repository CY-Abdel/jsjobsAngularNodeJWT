import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {
email: any;
password: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  login(formData: any) {
    this.authService.login(formData)
      .subscribe({
        next: data => { this.handleLoginSucces(data) },
        error : err => { this.handleLoginFailure(err) }
      });
  }

  handleLoginSucces(data : any) {
    console.log('success ', data);
  }

  handleLoginFailure(error : any) {
    console.log('failure ', error);
  }

}

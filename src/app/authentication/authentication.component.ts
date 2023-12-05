import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {
  email!: any;
  password!: any;

  isAuthenricated = false;
  jbbData = null;
  welcomeMessage: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // jbb-data est le nom du token
    if (localStorage.getItem('jbb-data')) {
      this.refreshFlags;
    }
  }

  refreshFlags() {
    this.isAuthenricated = true;
    this.welcomeMessage = 'Bienvenue';
  }

  login(formData: any) {
    this.authService.login(formData)
      .subscribe({
        next: data => { this.handleLoginSucces(data) },
        error: err => { this.handleLoginFailure(err) }
      });
  }

  handleLoginSucces(data: any) {
    console.log('success ', data);
    this.jbbData = data;
    this.refreshFlags();
    //stringify car dans le localstorage on ne peut mettre que des string pas du json
    localStorage.setItem('jbb-data', JSON.stringify(data));
  }

  handleLoginFailure(error: any) {
    console.log('failure ', error);
  }

}

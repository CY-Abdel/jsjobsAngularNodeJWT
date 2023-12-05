import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  decodeToken: any = null;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.userIsLoggedIn()) {

      const jbbTokenString = localStorage.getItem('jbb-data');

      if (jbbTokenString !== null) {
        const jbbToken = JSON.parse(jbbTokenString);

        this.decodeToken = this.authService.decodeToken(jbbToken.token);

        console.log(this.decodeToken);
      } else {
        console.error("La clé 'jbb-data' n'a pas été trouvée dans le stockage local.");
      }
    }
  }

}

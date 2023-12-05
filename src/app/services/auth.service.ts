import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth';

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post(this.BASE_URL + '/login', credentials)
      .pipe(
        map((res: any) => { return res;  /** console.log(res);*/ })
      );
  }

  userIsLoggedIn() {
    return localStorage.getItem('jbb-data'); //true or false
  }

  logout() {
    localStorage.removeItem('jbb-data');
  }

  register(credentials: any) {
    console.log('register ', credentials);
  }

}

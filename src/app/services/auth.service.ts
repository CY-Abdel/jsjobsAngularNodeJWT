import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
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
    return !!localStorage.getItem('jbb-data'); //true or false // !! caster un valeur en booleen
  }

  logout() {
    localStorage.removeItem('jbb-data');
  }

  addAuthorizationHeader(token : string) {
    // 'Authorization' : 'Bearer azeazeazeazeazeaze';
    const authorizationHeader = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return { headers: authorizationHeader };
  }

  register(credentials: any) {
    // console.log('register ', credentials);
    return this.http.post(`${this.BASE_URL}/register`, credentials)
      .pipe(
        map((res: any) => { return res })
      );
  }

  decodeToken(token: any) {
    return jwtDecode(token);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private router: Router,
    public http: HttpClient,
    private storage: Storage
  ) { }
  login(loginForm) {
    const body: any = {
      username: loginForm.value.username,
      password: loginForm.value.password
    };
    const loggedUser: any = {
      identifier: loginForm.value.username
    };
    return this.http.post(environment.api_url + environment.login, JSON.stringify(body), { headers: this.headers });
  }
  logout() {
    if (this.storage.get('token')) {
      this.storage.clear().then(
        () => this.router.navigateByUrl('login'),
      );
    }
  }
  getUserData(): Promise<any> {
    return;
  }
}
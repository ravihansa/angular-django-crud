import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    password: '',
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  loginUser(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

}

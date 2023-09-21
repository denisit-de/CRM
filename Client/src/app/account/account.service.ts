import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/account/Register';
import { User } from '../models/account/User';
import { Login } from '../models/account/Login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl: string = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient
  ) { }

  public register(user: Register) {
    return this.http.post<User>(this.apiUrl + 'account/register', user);
  }

  public login(user: Login) {
    return this.http.post<User>(this.apiUrl + 'account/login', user);
  }
}

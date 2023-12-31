import { Session } from 'src/app/models/account/Session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/account/Register';
import { User } from '../models/account/User';
import { Login } from '../models/account/Login';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSource = new ReplaySubject<Session | null>(1);
  public loggedInUser$ = this.userSource.asObservable();

  apiUrl: string = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public register(user: Register) {
    return this.http.post<User>(this.apiUrl + 'account/register', user);
  }

  public login(user: Login) {
    var observable =  this.http.post<Session>(this.apiUrl + 'account/login', user)
                          .pipe(map(user => user as Session));
    observable.subscribe(data => this.onLogin(data))
    return observable;
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('session');
    this.userSource.next(null);

    this.router.navigate(['/account/login']);
  }

  public getLoggedinUser() {
    const userString = localStorage.getItem('session')
    if(userString) {
      const user: Session = JSON.parse(userString);
      this.setLoggedInUser(user);
    } else {
      this.userSource.next(null);
    }
  }

  private onLogin(data: Session): void {
    localStorage.setItem('session', JSON.stringify(data));
    this.setLoggedInUser(data);
  }

  private setLoggedInUser(data: Session): void {
    this.userSource.next(data);
  }
}

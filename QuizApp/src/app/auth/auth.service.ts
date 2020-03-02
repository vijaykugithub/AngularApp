import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl="https://localhost:5001/api/"
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router, private httpClient:HttpClient
  ) {}

  login(user: User){
    if (user.UserName !== '' && user.Password !== '' ) {
       // {3}
       console.log(user);
   return this.httpClient.post(this.baseUrl+"ApplicationUser/Login",user)
     // this.loggedIn.next(true);
     // this.router.navigate(['/']);
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
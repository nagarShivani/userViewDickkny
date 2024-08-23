import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private userService: UserService) {}

  isAuthenticated() {
    const storedUserInfo = localStorage.getItem('isLoggedIn');
    if (storedUserInfo) {
      try {
        return true
      } catch (error) {
        return false
      }
    } else {
      return false
    }
  }
}

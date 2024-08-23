import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router, private userService: UserService) { }


  logout() {
    window.location.reload();
    localStorage.removeItem('isLoggedIn');
    this.userService.toast.snackbarError("Logout Successful");
    setTimeout(() => {
    this.router.navigate(['/signin']);
    }, 1000);
  }

}

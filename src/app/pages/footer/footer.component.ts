import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isLoggedInObject: any;
  constructor(private router: Router,
    private userService: UserService,
    private datePipe: DatePipe
  ) {
    this.userService.isLogIn.subscribe((data:any)=>{
      this.redirectPage();
    })
    this.redirectPage();
  }

  redirectPage(page?: any) {
    const storedUserInfo = localStorage.getItem('isLoggedIn');
    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);
        if(page){
        this.router.navigate([page]);
        }
      } catch (error) {
        this.isLoggedInObject = {};
        if(page){
          this.router.navigate(['signin']);
        this.userService.toast.snackbarError("Please first login");
        }
      }
    } else {
      this.isLoggedInObject = {};
      if(page){
        this.router.navigate(['signin']);
      this.userService.toast.snackbarError("Please first login");
      }
    }
  }

  getCurrentYear() {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'yyyy');
  }
  

}

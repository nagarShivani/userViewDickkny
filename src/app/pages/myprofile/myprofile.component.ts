import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent {
  UserDetails: any = {};
  isLoggedInObject: any;
  constructor(private userService: UserService,
    private loaderService: LoaderService,
    private router: Router,
    private categoryService: CategoryService,) {
    this.getIsLoggedInObject();
  }

  getIsLoggedInObject() {
    const storedUserInfo = localStorage.getItem('isLoggedIn');
    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);
        this.getUserDetailById(this.isLoggedInObject);
      } catch (error) {
        console.error('Error parsing JSON from local storage:', error);
        this.isLoggedInObject = {};
      }
    } else {
      this.isLoggedInObject = {};
    }
  }

  getUserDetailById(loginDetail: any) {
    this.loaderService.showLoading();
    this.categoryService.getUserDetailById(loginDetail.loginid).subscribe(
      (res: any) => {
        this.UserDetails = res.user;
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  submitProfileDetails() {
    this.loaderService.showLoading();
    this.categoryService.updateUserDetails(this.isLoggedInObject.loginid,this.UserDetails).subscribe(
      (res: any) => {
        this.userService.toast.snackbarError(res.message);
        this.router.navigate(['/dashboard']);
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

}

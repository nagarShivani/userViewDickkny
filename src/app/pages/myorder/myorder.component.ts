import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss']
})
export class MyorderComponent {
  getAllOrder: any;
  isLoggedInObject: any;

  constructor(private userService: UserService,
    private loaderService: LoaderService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.getIsLoggedInObject();

  }

  getIsLoggedInObject() {
    const storedUserInfo = localStorage.getItem('isLoggedIn');
    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);
        this.getMyOrders(this.isLoggedInObject);
      } catch (error) {
        console.error('Error parsing JSON from local storage:', error);
        this.isLoggedInObject = {};
      }
    } else {
      this.isLoggedInObject = {};
    }
  }

  getMyOrders(loginDetail: any) {
    this.loaderService.showLoading();
    this.categoryService.getMyOrders(loginDetail.loginid).subscribe(
      (res: any) => {
        this.getAllOrder = res.orders;
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      })
  }

}

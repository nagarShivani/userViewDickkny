import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  isLoggedInObject: any
  wishListOfUser: any;
  selectedSize: any;
  constructor(private userService: UserService,
    private loaderService: LoaderService,
    private categoryService: CategoryService
  ) {
    this.getIsLoggedInObject();
  }
  getIsLoggedInObject() {
    const storedUserInfo = localStorage.getItem('isLoggedIn');
    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);
        this.getWishListOfUser(this.isLoggedInObject);
      } catch (error) {
        console.error('Error parsing JSON from local storage:', error);
        this.isLoggedInObject = {};
      }
    } else {
      this.isLoggedInObject = {};
    }
  }

  getWishListOfUser(loginDetail: any) {
    this.loaderService.showLoading();
    this.categoryService.getWishListOfUser(loginDetail.loginid).subscribe(
      (res: any) => {
        this.wishListOfUser = res.items;
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }


  addToCart(productID: any) {
    this.loaderService.showLoading();
    let payload = {
      "userId": this.isLoggedInObject.loginid,
      "productId": productID,
      "quantity": 1,
      "size": this.selectedSize
    }
    this.categoryService.addToCart({ body: payload }).subscribe(
      (res: any) => {
        this.categoryService.isCartandWishlistCountCheck(true);
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(res.message);
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  removeFromWishlist(productID: any) {
    this.loaderService.showLoading();
    let payload = {
      "userId": this.isLoggedInObject.loginid,
      "productId": productID,
    }
    this.categoryService.removeFromWishList({ body: payload }).subscribe(
      (res: any) => {
        this.getWishListOfUser(this.isLoggedInObject);
        this.categoryService.isCartandWishlistCountCheck(true);
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(res.message);
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

}

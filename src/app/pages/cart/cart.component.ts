import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  isLoggedInObject: any;
  cartDetail: any;
  applycoupon: any;
  subTotal: any;
  discountValue: any;

  constructor(
    private userService: UserService,
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
        this.getCartOfUser(this.isLoggedInObject);
      } catch (error) {
        console.error('Error parsing JSON from local storage:', error);
        this.isLoggedInObject = {};
      }
    } else {
      this.isLoggedInObject = {};
    }
  }

  getCartOfUser(loginDetail: any) {
    this.loaderService.showLoading();
    this.categoryService.getCartOfUser(loginDetail.loginid).subscribe(
      (res: any) => {
        console.log('Response of actual cart componenet', res);
        this.cartDetail = res.items;

        this.subTotal = this.cartDetail.reduce((total: any, item: any) => {
          const price = parseFloat(item.productId.price);
          const salePrice = parseFloat(item.productId.salePrice);
          const itemPrice = isNaN(salePrice) ? price : salePrice;
          return total + itemPrice * item.quantity;
        }, 0);

        setTimeout(() => {
          this.loaderService.hideLoading();
        }, 1000);
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  removeFromCartlist(productID: any) {
    this.loaderService.showLoading();
    let payload = {
      userId: this.isLoggedInObject.loginid,
      productId: productID,
    };
    this.categoryService.removeFromCart({ body: payload }).subscribe(
      (res: any) => {
        this.getCartOfUser(this.isLoggedInObject);
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

  applyCoupon() {
    this.loaderService.showLoading();
    this.categoryService.applyCoupon({ code: this.applycoupon }).subscribe(
      (res: any) => {
        this.discountValue = res.discountValue;
        this.userService.toast.snackbarError('Coupon Applied successfully');
        this.loaderService.hideLoading();
        // this.applycoupon = "";
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  updateCart(productId: any, productSize: any, quantity: any) {
    const storedUserInfo = localStorage.getItem('isLoggedIn');
    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);
        let payload = {
          userId: this.isLoggedInObject.loginid,
          productId: productId,
          quantity: quantity,
          size: productSize,
        };
        this.categoryService.updateCart(payload).subscribe(
          (res: any) => {
            this.getCartOfUser(this.isLoggedInObject);
            this.userService.toast.snackbarError(res.message);
          },
          (error: any) => {
            this.userService.toast.snackbarError(error.error.error);
          }
        );
      } catch (error) {
        this.isLoggedInObject = {};
        this.router.navigate(['signin']);
        this.userService.toast.snackbarError('Please first login or register');
      }
    } else {
      this.isLoggedInObject = {};
      this.router.navigate(['signin']);
      this.userService.toast.snackbarError('Please first login or register');
    }
  }
}

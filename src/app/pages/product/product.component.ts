import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  quantity: number = 1;
  productDetails: any;
  productId: any;
  isLoggedInObject: any;
  selectedSize: any;
  getAllProducts: any;
  sizeSelected: boolean = false;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    const allProducts = localStorage.getItem('trendingProducts');
    if (allProducts) {
      this.getAllProducts = JSON.parse(allProducts);
    }
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.getproductByID(this.productId);
    });
  }

  getproductByID(id: any) {
    this.loaderService.showLoading();
    this.categoryService.getProductByID(id).subscribe(
      (res: any) => {
        this.productDetails = res;
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  addToWishlist(productID: any) {
    let payload = {
      userId: this.isLoggedInObject.loginid,
      productId: productID,
    };
    this.categoryService.addToWishlist({ body: payload }).subscribe(
      (res: any) => {
        this.userService.toast.snackbarError(res.message);
        this.categoryService.isCartandWishlistCountCheck(true);
      },
      (error: any) => {
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  // addToCart(productID: any) {
  //   const storedUserInfo = localStorage.getItem('isLoggedIn');
  //   if (storedUserInfo) {
  //     try {
  //       this.isLoggedInObject = JSON.parse(storedUserInfo);
  //       let payload = {
  //         userId: this.isLoggedInObject.loginid,
  //         productId: productID,
  //         quantity: this.quantity,
  //         size: this.selectedSize._id,
  //       };
  //       this.categoryService.addToCart({ body: payload }).subscribe(
  //         (res: any) => {
  //           this.userService.toast.snackbarError(res.message);
  //           this.categoryService.isCartandWishlistCountCheck(true);
  //         },
  //         (error: any) => {
  //           this.userService.toast.snackbarError(error.error.error);
  //         }
  //       );
  //     } catch (error) {
  //       this.isLoggedInObject = {};
  //       this.router.navigate(['signin']);
  //       this.userService.toast.snackbarError('Please first login or register');
  //     }
  //   } else {
  //     this.isLoggedInObject = {};
  //     this.router.navigate(['signin']);
  //     this.userService.toast.snackbarError('Please first login or register');
  //   }
  // }
  addToCart(productID: any) {
    if (!this.isLoggedInObject.loginid) {
      this.userService.toast.snackbarError('Please First Login.');
      return;
    }
    let payload = {
      userId: this.isLoggedInObject.loginid,
      productId: productID,
      quantity: 1,
      size: this.selectedSize?._id,
    };
    this.categoryService.addToCart({ body: payload }).subscribe(
      (res: any) => {
        console.log('resss');
        this.selectedSize = null;
        this.sizeSelected = false;
        this.categoryService.isCartandWishlistCountCheck(true);
        this.userService.toast.snackbarError(res.message);
      },
      (error: any) => {
        console.log('error');

        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }
  selectSize(productSize: any) {
    this.selectedSize = productSize;
    // this.sizeSelected = true;
  }
}

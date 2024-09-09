import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  quantity: number = 1;
  productDetails: any;
  productId: any;
  isLoggedInObject: any;
  selectedSize: any;
  getAllProducts: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    const allProducts = localStorage.getItem('trendingProducts');
    if (allProducts) {
      this.getAllProducts = JSON.parse(allProducts);
    }
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.getProductByID(this.productId);
    });
  }

  getProductByID(id: any) {
    this.loaderService.showLoading();
    this.categoryService.getProductByID(id).subscribe(
      (res: any) => {
        this.productDetails = res;
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        console.error('Error fetching product details:', error);
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  addToWishlist(productID: any) {
    if (!this.isLoggedInObject) {
      this.router.navigate(['signin']);
      this.userService.toast.snackbarError('Please first login or register');
      return;
    }

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
        console.error('Error adding to wishlist:', error);
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  addToCart(productID: any) {
    if (!this.isLoggedInObject) {
      this.router.navigate(['signin']);
      this.userService.toast.snackbarError('Please first login or register');
      return;
    }

    let payload = {
      userId: this.isLoggedInObject.loginid,
      productId: productID,
      quantity: this.quantity,
      size: this.selectedSize ? this.selectedSize._id : null,
    };

    if (!payload.size) {
      this.userService.toast.snackbarError('Please select a size');
      return;
    }

    this.categoryService.addToCart({ body: payload }).subscribe(
      (res: any) => {
        this.userService.toast.snackbarError(res.message);
        this.categoryService.isCartandWishlistCountCheck(true);
      },
      (error: any) => {
        console.error('Error adding to cart:', error);
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  selectSize(productSize: any) {
    this.selectedSize = productSize;
  }
}

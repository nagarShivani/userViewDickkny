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
  imgArray: any[] = [];
  productId: any;
  isLoggedInObject: any;
  selectedSize: any;
  getAllProducts: any;
  sizeSelected: boolean = false;
  apiUrl: string = 'your_api_url_here'; // Make sure to define your apiUrl

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const allProducts = localStorage.getItem('trendingProducts');
    if (allProducts) {
      this.getAllProducts = JSON.parse(allProducts);
    }

    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.getproductByID(this.productId);
      }
    });
  }

  getproductByID(id: any): void {
    this.loaderService.showLoading();

    this.categoryService.getProductByID(id).subscribe(
      (res: any) => {
        console.log('response 1', res);
        this.productDetails = res;
        console.log('response 2', this.productDetails);

        this.imgArray = this.productDetails.multipleimage || [];
        console.log('response 2', this.imgArray);

        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  addToWishlist(productID: any): void {
    const payload = {
      userId: this.isLoggedInObject?.loginid,
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

  addToCart(productID: any): void {
    if (!this.isLoggedInObject?.loginid) {
      this.userService.toast.snackbarError('Please First Login.');
      return;
    }
    const payload = {
      userId: this.isLoggedInObject.loginid,
      productId: productID,
      quantity: this.quantity,
      size: this.selectedSize?._id,
    };
    this.categoryService.addToCart({ body: payload }).subscribe(
      (res: any) => {
        console.log('Add to cart response', res);
        this.selectedSize = null;
        this.sizeSelected = false;
        this.categoryService.isCartandWishlistCountCheck(true);
        this.userService.toast.snackbarError(res.message);
      },
      (error: any) => {
        console.log('Add to cart error', error);
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  selectSize(productSize: any): void {
    this.selectedSize = productSize;
    // this.sizeSelected = true; // Uncomment if you need to use this
  }
}

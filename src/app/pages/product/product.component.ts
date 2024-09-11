import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  quantity: number = 1;
  productId: any;
  isLoggedInObject: any;
  selectedSize: any;
  productDetails$: Observable<any> = of(null);
  products: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.productDetails$ = this.getproductByID(this.productId);
    });
  }
  getAllproducts() {
    this.loaderService.showLoading();
    this.categoryService.getAllproducts().subscribe(
      (res: any) => {
        console.log('Get all product response coming from app', res);
        this.products = res.data;
        localStorage.setItem('allProducts', JSON.stringify(this.products));
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }
  getproductByID(id: any): Observable<any> {
    this.loaderService.showLoading();
    return this.categoryService.getProductByID(id).pipe(
      switchMap((res: any) => {
        this.loaderService.hideLoading();
        return of(res);
      }),
      catchError((error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
        return of(null);
      })
    );
  }
  addToWishlist(productID: any) {
    const storedUserInfo = localStorage.getItem('isLoggedIn');

    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);

        // Check if isLoggedInObject and loginid are valid
        if (this.isLoggedInObject && this.isLoggedInObject.loginid) {
          let payload = {
            userId: this.isLoggedInObject.loginid,
            productId: productID,
          };

          console.log('product wishlist payload', payload);

          this.categoryService.addToWishlist({ body: payload }).subscribe(
            (res: any) => {
              console.log('product wishlist response', res);
              this.userService.toast.snackbarError(res.message);
              this.categoryService.isCartandWishlistCountCheck(true);
            },
            (error: any) => {
              this.userService.toast.snackbarError(error.error.error);
            }
          );
        } else {
          this.userService.toast.snackbarError(
            'User information is incomplete. Please login again.'
          );
          this.router.navigate(['signin']);
        }
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

  addToCart(productID: any) {
    const storedUserInfo = localStorage.getItem('isLoggedIn');

    // Check if the user is logged in
    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);

        // Check if size is selected
        if (!this.selectedSize || !this.selectedSize._id) {
          this.userService.toast.snackbarError('Please select a size.');
          return;
        }

        let payload = {
          userId: this.isLoggedInObject.loginid,
          productId: productID,
          quantity: this.quantity,
          size: this.selectedSize._id,
        };

        this.categoryService.addToCart({ body: payload }).subscribe(
          (res: any) => {
            this.userService.toast.snackbarError(res.message);
            this.categoryService.isCartandWishlistCountCheck(true);
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

  selectSize(productSize: any) {
    this.selectedSize = productSize;
  }
}

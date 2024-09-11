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

  selectSize(productSize: any) {
    this.selectedSize = productSize;
  }
}

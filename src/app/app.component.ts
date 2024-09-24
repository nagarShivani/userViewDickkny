import {
  Component,
  OnInit,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import { LoaderService } from './services/loader/loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CategoryService } from './services/category/category.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  // searchResults: any[] = [];

  // onSearchResults(results: any[]): void {
  //   this.searchResults = results;
  // }

  searchTerm: string = '';  // This stores the search term from the header

  onSearchTermChange(term: string) {
    this.searchTerm = term;  // Update the search term when it changes
    console.log('Search term Filtering :', this.searchTerm);  // Log to check if search term is passed
  }
  title = 'dickkny';
  getAllBlogDetails: any;
  getAllBannerDetails: any;
  getTrendingProductsDetails: any;
  getFeaturedProductsDetails: any;
  allCategory: any;
  products: any;
  isLoggedInObject: any;
  loadingImagesCount = 0;

  constructor(
    public loaderService: LoaderService,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService
  ) {
    this.getIsLoggedInObject();
    this.getAllCategory();
    // this.getFeaturedProducts();
    this.getTrendingProducts();
    this.getAllproducts();
    this.getAllBlog();
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  getIsLoggedInObject() {
    const storedUserInfo = localStorage.getItem('isLoggedIn');
    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);
      } catch (error) {
        console.error('Error parsing JSON from local storage:', error);
        this.isLoggedInObject = {};
      }
    } else {
      this.isLoggedInObject = {};
    }
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

  getAllCategory() {
    this.loaderService.showLoading();
    this.categoryService.getAllCategory().subscribe(
      (res: any) => {
        console.log('Get all category response coming from app', res);

        this.allCategory = res.data;
        localStorage.setItem('allCategory', JSON.stringify(this.allCategory));
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  getFeaturedProducts() {
    this.loaderService.showLoading();
    this.categoryService
      .getProductByCategoryId('666ec81ba6adb24d200f8ba5')
      .subscribe(
        (res: any) => {
          this.getFeaturedProductsDetails = res;
          localStorage.setItem(
            'allFeaturedProducts',
            JSON.stringify(this.getFeaturedProductsDetails)
          );
          this.loaderService.hideLoading();
        },
        (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
        }
      );
  }

  getTrendingProducts() {
    this.loaderService.showLoading();
    this.categoryService
      .getProductByCategoryId('66d2cd290141a6320116542b')
      .subscribe(
        (res: any) => {
          console.log('Get all trending response coming from app', res);

          this.getTrendingProductsDetails = res;
          localStorage.setItem(
            'trendingProducts',
            JSON.stringify(this.getTrendingProductsDetails)
          );
          this.loaderService.hideLoading();
        },
        (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
        }
      );
  }

  getAllBlog() {
    this.loaderService.showLoading();
    this.categoryService.getAllBlog().subscribe(
      (res: any) => {
        console.log('Get all blog response coming from app', res);

        this.getAllBlogDetails = res.data;
        localStorage.setItem(
          'allBlogDetails',
          JSON.stringify(this.getAllBlogDetails)
        );
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }
  
}

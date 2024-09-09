import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedInObject: any;
  countOfCartAndWishlist: any;
  allCategory: any;
  searchResults: any;
  timer: any;
  searchResult: any;
  getLimitedCategories() {
    return this.allCategory.slice(0, 4);
  }
  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private categoryService: CategoryService
  ) {
    this.getAllCategory();

    this.userService.isLogIn.subscribe((data: any) => {
      this.getIsLoggedInObject();
    });
    this.categoryService.isCartandWishlist.subscribe((data: any) => {
      this.getIsLoggedInObject();
    });
    this.getIsLoggedInObject();
  }

  getAllCategory() {
    this.loaderService.showLoading();
    this.categoryService.getAllCategory().subscribe(
      (res: any) => {
        this.allCategory = res.data;
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  getIsLoggedInObject() {
    const storedUserInfo = localStorage.getItem('isLoggedIn');
    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);
        this.getCountOfCartAndWishListOfUser(this.isLoggedInObject);
      } catch (error) {
        console.error('Error parsing JSON from local storage:', error);
        this.isLoggedInObject = {};
      }
    } else {
      this.isLoggedInObject = {};
    }
  }

  getCountOfCartAndWishListOfUser(loginDetail: any) {
    this.loaderService.showLoading();
    this.categoryService
      .getCountOfCartAndWishListOfUser(loginDetail.loginid)
      .subscribe(
        (res: any) => {
          this.countOfCartAndWishlist = res;
          this.loaderService.hideLoading();
        },
        (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
        }
      );
  }

  debounce(func: Function, timeout: number = 500) {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      func.apply(this);
    }, timeout);
  }

  searchProducts(searchTerm: any) {
    this.debounce(() => this.search(searchTerm));
  }

  search(searchTerm: any) {
    this.categoryService.searchProducts(searchTerm).subscribe(
      (res: any) => {
        console.log('Search response', res);
        this.searchResults = res;
      },
      (error: any) => {
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }
}

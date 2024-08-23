import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelType, Options } from 'ng5-slider';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';
// category.interface.ts
export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image?: string;
  selected?: boolean; // Add selected property
}

interface Brand {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image?: string;
  selected: boolean;
}


interface Size {
  _id: string;
  size: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image?: string;
  selected: boolean;
}


interface Color {
  _id: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image?: string;
  selected: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  selectedSizes: Size[] = [];
  products: any;
  selectedCategories: Category[] = [];
  selectedBrands: Brand[] = [];
  isLoggedInObject: any;
  id: any;
  selectedSize: any;
  getCatSizeColorBrandPriceDetails: any;
  selectedColors: Color[] = [];
  minPrice: number | null | undefined;
  maxPrice: number | null | undefined;
  constructor(private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {
    this.getIsLoggedInObject();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getProductByCategoryId(this.id);
      } else {
        this.getAllproducts();
      }
    });
    this.getCatSizeColorBrandPrice();
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


  getProductByCategoryId(id: any) {
    this.loaderService.showLoading();
    this.categoryService.getProductByCategoryId(id).subscribe(
      (res: any) => {
        this.products = res;
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }



  getAllproducts() {
    this.loaderService.showLoading();
    this.categoryService.getAllproducts().subscribe(
      (res: any) => {
        this.products = res.data;
        setTimeout(() => {
          this.loaderService.hideLoading();
        }, 2000);
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  addToWishlist(productID: any) {
    if (!this.isLoggedInObject.loginid) {
      this.userService.toast.snackbarError("Please First Login.");
      return
    }
    let payload = {
      "userId": this.isLoggedInObject.loginid,
      "productId": productID,
    }
    this.categoryService.addToWishlist({ body: payload }).subscribe(
      (res: any) => {
        this.categoryService.isCartandWishlistCountCheck(true);
        this.userService.toast.snackbarError(res.message);
      },
      (error: any) => {
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  addToCart(productID: any) {
    if (!this.isLoggedInObject.loginid) {
      this.userService.toast.snackbarError("Please First Login.");
      return
    }
    let payload = {
      "userId": this.isLoggedInObject.loginid,
      "productId": productID,
      "quantity": 1,
      "size": this.selectedSize?._id
    }
    this.categoryService.addToCart({ body: payload }).subscribe(
      (res: any) => {
        console.log("resss");

        this.categoryService.isCartandWishlistCountCheck(true);
        this.userService.toast.snackbarError(res.message);
      },
      (error: any) => {
        console.log("error");

        this.userService.toast.snackbarError(error.error.error);
      }
    );

  }

  getCatSizeColorBrandPrice() {
    this.categoryService.getCatSizeColorBrandPrice().subscribe(
      (res: any) => {
        this.getCatSizeColorBrandPriceDetails = res;
      },
      (error: any) => {
        this.userService.toast.snackbarError(error.error.error);
      })
  }

  applyFilters() {
    this.selectedCategories = this.getCatSizeColorBrandPriceDetails.categories.filter((category: Category) => category.selected);
    this.selectedColors = this.getCatSizeColorBrandPriceDetails.colors.filter((color: Color) => color.selected);
    this.selectedBrands = this.getCatSizeColorBrandPriceDetails?.brands.filter((brand: Brand) => brand.selected);
    this.selectedSizes = this.getCatSizeColorBrandPriceDetails?.sizes.filter((size: Size) => size.selected);
    let data: any = {}; 

    if (this.selectedCategories.length > 0) {
      data.category = this.selectedCategories.map(category => category.name);
    }

    if (this.selectedColors.length > 0) {
      data.color = this.selectedColors.map(color => color.color);
    }

    if (this.selectedBrands.length > 0) {
      data.brand = this.selectedBrands.map(brand => brand.name);
    }

    if (this.selectedSizes.length > 0) {
      data.size = this.selectedSizes.map(size => size.size);
    }
    const storedMinPrice = localStorage.getItem('minPrice');
    const storedMaxPrice = localStorage.getItem('maxPrice');
    this.minPrice = storedMinPrice !== null ? parseFloat(storedMinPrice) : null;
    this.maxPrice = storedMaxPrice !== null ? parseFloat(storedMaxPrice) : null;

    data.min_price = this.minPrice ? this.minPrice : 0;
    data.max_price = this.maxPrice ? this.maxPrice : this.getCatSizeColorBrandPriceDetails.price;

    this.getAllProductApiforFilter(data);
  }


  getAllProductApiforFilter(data: any) {
    this.loaderService.showLoading();
    this.categoryService.getAllProductApiforFilter(data).subscribe(
      (res: any) => {
        this.products = res.data;
        this.userService.toast.snackbarError(res.message);
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.message);
      }
    );
  }

  clearFilters() {
    this.getCatSizeColorBrandPriceDetails.colors.forEach((color: Color) => color.selected = false);
    this.getCatSizeColorBrandPriceDetails.categories.forEach((category: Category) => category.selected = false);
    this.getCatSizeColorBrandPriceDetails.brands.forEach((brand: Brand) => brand.selected = false);
    this.getCatSizeColorBrandPriceDetails.sizes.forEach((size: Size) => size.selected = false);
    
    this.selectedCategories = [];
    this.selectedColors = [];
    this.selectedBrands = [];
    this.selectedSizes = [];
    this.minPrice = null;
    this.maxPrice = null;
    localStorage.removeItem('minPrice');
    localStorage.removeItem('maxPrice');
    
    if (this.id) {
        this.getProductByCategoryId(this.id);
    } else {
        this.getAllproducts();
    }
}


  onCategoryChange(category: any): void {
    category.selected = !category.selected;
  }

  selectSize(productSize: any) {
    this.selectedSize = productSize;
  }

  toggleSize(size: any): void {
    size.selected = !size.selected;
  }



  isSelected(size: string): boolean {
    return this.getCatSizeColorBrandPriceDetails.sizes.includes(size);
  }

  toggleColor(color: { color: string, selected: boolean }): void {
    color.selected = !color.selected;
  }

  toggleBrand(brand: any): void {
    brand.selected = !brand.selected;
  }

}
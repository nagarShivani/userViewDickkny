import { Component, AfterViewInit, OnDestroy ,OnInit,Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SerachService } from 'src/app/serach.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy{
  translateX = 0;

  nextSlide() {
    if (this.translateX > -(this.products.length - 1) * 100) {
      this.translateX -= 100;
    }
  }

  prevSlide() {
    if (this.translateX < 0) {
      this.translateX += 100;
    }
  }


  
  // productsToShow = -10; // Initially show 10 products
  // | slice:0:productsToShow
  products: any[] = []; // Assume this is populated with your products
  filteredProducts: any[] = [];
  allCategory: any;
  getTrendingProductsDetails: any;
  getFeaturedProductsDetails: any;
  getAllBannerDetails: any;
  // products: any;
  isLoggedInObject: any;
  getAllBlogDetails: any;
  getTrendingProduct: any;
  selectedSize: any;
  sizeSelected: boolean = false;
  getAllProducts: any;
  getAllBlogs: any;
  getAllCategories: any;
  allFeaturedProduct: any;

  
  constructor(
    private searchService: SerachService,
    private userService: UserService,
    private loaderService: LoaderService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.getIsLoggedInObject();
    this.getAllCategory();
    this.getFeaturedProducts();
    this.getTrendingProducts();
    this.getAllBanner();
    this.getAllproducts();
    this.getAllBlog();
  }

  ngAfterViewInit() {
    this.sliderData();

    // this.initializeOwlCarousel();
  }
  ngOnDestroy() {
    // Clean up carousel when the component is destroyed
    if ($('.owl-carousel').data('owl.carousel')) {
      $('.owl-carousel')
        .trigger('destroy.owl.carousel')
        .removeClass('iowl-loaded');
    }
  }


initializeOwlCarousel() {
  // General initialization for other carousels
  if ($('.owl-carousel').length) {
      const $carousel = $('.owl-carousel');
      if ($carousel.data('owl.carousel')) {
          $carousel.trigger('destroy.owl.carousel');
      }

      // Initialize other carousels (without the specific ID)
      $carousel.not('#trending-products-carousel').owlCarousel({
          nav: true,
          dots: false,
          margin: 20,
          loop: true,
          responsive: {
              0: { items: 2, margin: 10, dots: false, nav: true },
              480: { items: 2, margin: 10, dots: false, nav: true },
              768: { items: 4, nav: true, dots: false },
              992: { items: 7, nav: true, dots: false },
              1200: { items: 7, nav: true, dots: false },
          },
      });
  }

  // Specific initialization for the Trending Products carousel
  if ($('#trending-products-carousel').length) {
      const $trendingCarousel = $('#trending-products-carousel');
      if ($trendingCarousel.data('owl.carousel')) {
          $trendingCarousel.trigger('destroy.owl.carousel');
      }

      // Initialize the trending products carousel with 4 items for larger screens
      $trendingCarousel.owlCarousel({
          nav: true,
          dots: false,
          margin: 20,
          loop: true,
          responsive: {
              0: { items: 2, margin: 10, dots: false, nav: true },
              480: { items: 2, margin: 10, dots: false, nav: true },
              768: { items: 2, nav: true, dots: false },
              992: { items: 4, nav: true, dots: false },  // Set 4 items for larger screens
              1200: { items: 4, nav: true, dots: false }, // Set 4 items for larger screens
          },
      });
  }
   // Specific initialization for the Trending Products carousel
   if ($('#trending-blogs-carousel').length) {
    const $blogCarousel = $('#trending-blogs-carousel');
    if ($blogCarousel.data('owl.carousel')) {
        $blogCarousel.trigger('destroy.owl.carousel');
    }

    // Initialize the blogs carousel with 4 items for larger screens
    $blogCarousel.owlCarousel({
        nav: true,
        dots: false,
        margin: 20,
        loop: true,
        responsive: {
            0: { items: 2, margin: 10, dots: false, nav: true },
            480: { items: 2, margin: 10, dots: false, nav: true },
            768: { items: 2, nav: true, dots: false },
            992: { items: 4, nav: true, dots: false },  // Set 4 items for larger screens
            1200: { items: 4, nav: true, dots: false }, // Set 4 items for larger screens
        },
    });
}
}


  sliderData() {
    this.loaderService.showLoading();

    const initializeCarousel = () => {
      this.loaderService.hideLoading();
      setTimeout(() => {
        this.initializeOwlCarousel();
      }, 0); // Delay to ensure DOM is updated
    };

    const trendingProducts = localStorage.getItem('trendingProducts');
    const allProducts = localStorage.getItem('allProducts');
    const allBlogs = localStorage.getItem('allBlogDetails');
    const allCategory = localStorage.getItem('allCategory');
    const allFeaturedProducts = localStorage.getItem('allFeaturedProducts');

    if (
      trendingProducts &&
      allProducts &&
      allBlogs &&
      allCategory &&
      allFeaturedProducts
    ) {
      this.getTrendingProduct = JSON.parse(trendingProducts);
      this.getAllProducts = JSON.parse(allProducts);
      this.getAllBlogs = JSON.parse(allBlogs);
      this.getAllCategories = JSON.parse(allCategory);
      this.allFeaturedProduct = JSON.parse(allFeaturedProducts);

      console.log('Slider data loaded from local storage');
      initializeCarousel(); // Initialize carousel with local storage data
    } else {
      const requests: any[] = [];
      if (!trendingProducts) {
        requests.push(
          this.categoryService
            .getProductByCategoryId('66d2cd290141a6320116542b')
            .toPromise()
            .then((res: any) => {
              // this.getTrendingProductsDetails = res;
              this.getTrendingProduct = res;
              localStorage.setItem(
                'trendingProducts',
                JSON.stringify(this.getTrendingProduct)
              );
            })
        );
      }


      if (!allProducts) {
        requests.push(
          this.categoryService
            .getAllproducts()
            .toPromise()
            .then((res: any) => {
              this.getAllProducts = res.data;
              localStorage.setItem(
                'allProducts',
                JSON.stringify(this.getAllProducts)
              );
            })
        );
      }

      if (!allBlogs) {
        requests.push(
          this.categoryService
            .getAllBlog()
            .toPromise()
            .then((res: any) => {
              this.getAllBlogs = res.data;
              localStorage.setItem(
                'allBlogDetails',
                JSON.stringify(this.getAllBlogs)
              );
            })
        );
      }

      if (!allCategory) {
        requests.push(
          this.categoryService
            .getAllCategory()
            .toPromise()
            .then((res: any) => {
              debugger;
              console.log('get all categories slider response today', res);
              this.getAllCategories = res.data;
              localStorage.setItem(
                'allCategory',
                JSON.stringify(this.getAllCategories)
              );
            })
        );
      }

      Promise.all(requests)
        .then(() => {
          console.log('Slider data fetched from server');
          initializeCarousel(); // Initialize carousel after all data is fetched
        })
        .catch((error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
        });
    }
  }

  // Other methods remain unchanged

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
        console.log('Get all Products response', res);
        this.products = res.data;
        // this.filteredProducts = this.products;
        console.log('products', this.products);
        localStorage.setItem('allProducts', JSON.stringify(this.products));
        this.loaderService.hideLoading();
        this.initializeOwlCarousel(); // Ensure the slider is initialized after data load
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
        console.log('get all category', res);
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
          console.log('featured products', res);
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
          console.log('get all trending products', res);
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

  getAllBanner() {
    this.loaderService.showLoading();
    this.categoryService.getAllBanner().subscribe(
      (res: any) => {
        console.log('get all banner', res);
        this.getAllBannerDetails = res.data;
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  addToWishlist(productID: any) {
    if (!this.isLoggedInObject.loginid) {
      this.userService.toast.snackbarError('Please First Login.');
      return;
    }
    let payload = {
      userId: this.isLoggedInObject.loginid,
      productId: productID,
    };
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

  getAllBlog() {
    this.loaderService.showLoading();
    this.categoryService.getAllBlog().subscribe(
      (res: any) => {
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

  selectSize(productSize: any) {
    this.selectedSize = productSize;
    this.sizeSelected = true;
  }
}

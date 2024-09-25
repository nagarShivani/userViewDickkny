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
export class HomeComponent implements AfterViewInit, OnDestroy,OnInit{
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

  ngOnInit() {
    this.getAllproducts();
    this.searchService.searchQuery$.subscribe((query) => {
      this.filteredProducts = this.filterProducts(query);
    });
  }
  filterProducts(query: string): any[] {
    if (!query) {
      return this.products; // If no query, show all products
    }
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
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
    if ($('.owl-carousel').length) {
      const $carousel = $('.owl-carousel');
      if ($carousel.data('owl.carousel')) {
        $carousel.trigger('destroy.owl.carousel');
      }

      $carousel.owlCarousel({
        nav: true,
        dots: false,
        margin: 20,
        loop: true,
        responsive: {
          0: { items: 2, margin: 10, dots: false, nav: true },
          480: { items: 2, margin: 10, dots: false, nav: true },
          768: { items: 4, nav: true, dots: false },
          992: { items: 4, nav: true, dots: false },
          1200: { items: 4, nav: true, dots: false },
        },
      });
    }

    // Initialize specific carousel for trending categories
    // if ($('.trending-carousel').length) {
    //   $('.trending-carousel').owlCarousel({
    //     nav: true,
    //     dots: false,
    //     margin: 20,
    //     loop: true,
    //     responsive: {
    //       0: { items: 4, margin: 10, dots: true, nav: false },
    //       480: { items: 4, margin: 10, dots: true, nav: false },
    //       768: { items: 6 },
    //       992: { items: 6 },
    //       1200: { items: 5, nav: true, dots: false },
    //     },
    //   });
    // }
  }

  // sliderData() {
  //   const trendingProducts = localStorage.getItem('trendingProducts');
  //   if (trendingProducts) {
  //     this.getTrendingProduct = JSON.parse(trendingProducts);
  //     console.log('Trending Products', this.getTrendingProduct);
  //   }
  //   const allProducts = localStorage.getItem('allProducts');
  //   if (allProducts) {
  //     this.getAllProducts = JSON.parse(allProducts);
  //     console.log('product sliders', this.getAllProducts);
  //   }
  //   const allBlogs = localStorage.getItem('allBlogDetails');
  //   if (allBlogs) {
  //     this.getAllBlogs = JSON.parse(allBlogs);
  //   }
  //   const allCategory = localStorage.getItem('allCategory');
  //   if (allCategory) {
  //     this.getAllCategories = JSON.parse(allCategory);
  //   }
  //   const allFeaturedProducts = localStorage.getItem('allFeaturedProducts');
  //   if (allFeaturedProducts) {
  //     this.allFeaturedProduct = JSON.parse(allFeaturedProducts);
  //   }
  // }
  // new

  // sliderData() {
  //   // this.loaderService.showLoading();

  //   this.categoryService.getAllCategory().subscribe(
  //     (res: any) => {
  //       console.log('get all category', res);
  //       this.getAllCategories = res.data;
  //       localStorage.setItem(
  //         'allCategory',
  //         JSON.stringify(this.getAllCategories)
  //       );
  //       this.initializeOwlCarousel(); // Initialize the carousel after data load
  //       this.loaderService.hideLoading();
  //     },
  //     (error: any) => {
  //       this.loaderService.hideLoading();
  //       this.userService.toast.snackbarError(error.error.error);
  //     }
  //   );
  //   // getProduct
  //   // this.loaderService.showLoading();

  //   // this.categoryService.getAllproducts().subscribe(
  //   //   (res: any) => {
  //   //     console.log('Get all Products response', res);
  //   //     this.getAllProducts = res.data;
  //   //     localStorage.setItem(
  //   //       'allProducts',
  //   //       JSON.stringify(this.getAllProducts)
  //   //     );
  //   //     // Optionally reinitialize carousel if products affect it
  //   //     this.initializeOwlCarousel();
  //   //   },
  //   //   (error: any) => {
  //   //     this.loaderService.hideLoading();
  //   //     this.userService.toast.snackbarError(error.error.error);
  //   //   }
  //   // );
  //   // Additional data fetching and storage
  //   // Ensure to call initializeOwlCarousel() after setting data if needed
  // }
  // existing
  // sliderData() {
  //   this.loaderService.showLoading();

  //   // Helper function to initialize the carousel
  //   const initializeCarousel = () => {
  //     this.initializeOwlCarousel();
  //     this.loaderService.hideLoading();
  //   };

  //   // Check if data is available in local storagee and initialize carousel if so
  //   const trendingProducts = localStorage.getItem('trendingProducts');
  //   console.log('local strorage trending products', trendingProducts);
  //   const allProducts = localStorage.getItem('allProducts');
  //   console.log('local strorage  Products', allProducts);

  //   const allBlogs = localStorage.getItem('allBlogDetails');
  //   console.log('local strorage  Blogs', allBlogs);

  //   const allCategory = localStorage.getItem('allCategory');
  //   console.log('local strorage  Category', allCategory);

  //   const allFeaturedProducts = localStorage.getItem('allFeaturedProducts');

  //   if (
  //     trendingProducts &&
  //     allProducts &&
  //     allBlogs &&
  //     allCategory &&
  //     allFeaturedProducts
  //   ) {
  //     this.getTrendingProduct = JSON.parse(trendingProducts);
  //     this.getAllProducts = JSON.parse(allProducts);
  //     this.getAllBlogs = JSON.parse(allBlogs);
  //     this.getAllCategories = JSON.parse(allCategory);
  //     this.allFeaturedProduct = JSON.parse(allFeaturedProducts);

  //     console.log('slider Trending Products', this.getTrendingProduct);
  //     console.log('Product Sliders', this.getAllProducts);
  //     console.log('All Blogs slider', this.getAllBlogs);
  //     console.log('All Categories sliders', this.getAllCategories);
  //     console.log('Featured Products sliders', this.allFeaturedProduct);

  //     initializeCarousel(); // Initialize carousel with local storage data
  //   } else {
  //     // Fetch missing data from the server
  //     const requests: any[] = [];

  //     // if (!trendingProducts) {
  //     //   requests.push(
  //     //     this.categoryService
  //     //       .getTrendingProducts()
  //     //       .toPromise()
  //     //       .then((res: any) => {
  //     //         this.getTrendingProduct = res.data;
  //     //         localStorage.setItem(
  //     //           'trendingProducts',
  //     //           JSON.stringify(this.getTrendingProduct)
  //     //         );
  //     //       })
  //     //   );
  //     // }

  //     if (!allProducts) {
  //       requests.push(
  //         this.categoryService
  //           .getAllproducts()
  //           .toPromise()
  //           .then((res: any) => {
  //             console.log('all product response', res);
  //             this.getAllProducts = res.data;
  //             localStorage.setItem(
  //               'allProducts',
  //               JSON.stringify(this.getAllProducts)
  //             );
  //           })
  //       );
  //     }

  //     if (!allBlogs) {
  //       requests.push(
  //         this.categoryService
  //           .getAllBlog()
  //           .toPromise()
  //           .then((res: any) => {
  //             console.log('all blog response', res);

  //             this.getAllBlogs = res.data;
  //             localStorage.setItem(
  //               'allBlogDetails',
  //               JSON.stringify(this.getAllBlogs)
  //             );
  //           })
  //       );
  //     }

  //     if (!allCategory) {
  //       requests.push(
  //         this.categoryService
  //           .getAllCategory()
  //           .toPromise()
  //           .then((res: any) => {
  //             console.log('all category response', res);

  //             this.getAllCategories = res.data;
  //             localStorage.setItem(
  //               'allCategory',
  //               JSON.stringify(this.getAllCategories)
  //             );
  //           })
  //       );
  //     }

  //     // if (!allFeaturedProducts) {
  //     //   requests.push(this.categoryService.getFeaturedProducts().toPromise().then((res: any) => {
  //     //     this.allFeaturedProduct = res.data;
  //     //     localStorage.setItem('allFeaturedProducts', JSON.stringify(this.allFeaturedProduct));
  //     //   }));
  //     // }

  //     Promise.all(requests)
  //       .then(() => {
  //         initializeCarousel(); // Initialize carousel after all data has been fetched and stored
  //       })
  //       .catch((error: any) => {
  //         this.loaderService.hideLoading();
  //         this.userService.toast.snackbarError(error.error.error);
  //       });
  //   }
  // }

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
        this.filteredProducts = this.products;
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

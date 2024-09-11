import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';
declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  isCouponApplied: boolean = false;
  discountValue: any;
  applycoupon: any;
  isLoggedInObject: any;
  cartDetail: any;
  subTotal: any;
  totalPrice: any;
  UserDetails: any;
  showAddAddressForm: boolean = false;
  selectedAddressIndex: number = 0;
  addressId: any;
  userDetails: any = {};
  states: any;
  // userDetails.country = "India"
  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.getIndiaState();
    this.userDetails.country = 'India';
    this.getIsLoggedInObject();
  }

  getIndiaState() {
    this.states = [
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
    ];
  }

  getIsLoggedInObject() {
    const storedUserInfo = localStorage.getItem('isLoggedIn');
    if (storedUserInfo) {
      try {
        this.isLoggedInObject = JSON.parse(storedUserInfo);
        this.getCartOfUser(this.isLoggedInObject);
        this.getUserDetailById(this.isLoggedInObject);
      } catch (error) {
        console.error('Error parsing JSON from local storage:', error);
        this.isLoggedInObject = {};
      }
    } else {
      this.isLoggedInObject = {};
    }
  }

  getUserDetailById(loginDetail: any) {
    this.loaderService.showLoading();
    this.categoryService.getUserDetailById(loginDetail.loginid).subscribe(
      (res: any) => {
        this.UserDetails = res.user;
        this.loaderService.hideLoading();
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  getCartOfUser(loginDetail: any) {
    this.loaderService.showLoading();
    this.categoryService.getCartOfUser(loginDetail.loginid).subscribe(
      (res: any) => {
        this.cartDetail = res.items;
        this.subTotal = this.cartDetail.reduce((total: any, item: any) => {
          const price = parseFloat(item.productId.price);
          const salePrice = parseFloat(item.productId.salePrice);
          const itemPrice = isNaN(salePrice) ? price : salePrice;
          return total + itemPrice * item.quantity;
        }, 0);
        let totalPrice = this.subTotal;
        const gstAmount = (18 / 100) * totalPrice;
        this.totalPrice = totalPrice + gstAmount;
        this.totalPrice = this.totalPrice.toFixed(2);

        setTimeout(() => {
          this.loaderService.hideLoading();
        }, 1000);
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  applyCoupon(coupon: any) {
    this.loaderService.showLoading();
    this.categoryService.applyCoupon({ code: coupon }).subscribe(
      (res: any) => {
        this.discountValue = res.discountValue;
        this.userService.toast.snackbarError('Coupon Applied successfully');
        this.loaderService.hideLoading();
        let totalPrice = this.subTotal - this.discountValue;
        const gstAmount = (18 / 100) * totalPrice;
        this.totalPrice = totalPrice + gstAmount;
        this.totalPrice = this.totalPrice.toFixed(2);
        this.isCouponApplied = true;
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  addAddress() {
    this.selectedAddressIndex = -1;
    this.showAddAddressForm = true;
  }

  selectDeliveryAddress(index: any, addressId: any) {
    this.selectedAddressIndex = index;
    this.addressId = addressId;
  }

  saveAddress() {
    this.loaderService.showLoading();
    this.categoryService
      .addAddress(this.isLoggedInObject.loginid, this.userDetails)
      .subscribe(
        (res: any) => {
          this.addressId = res.newAddressId;
          this.payNow();
          this.userService.toast.snackbarError(res.message);
          this.loaderService.hideLoading();
        },
        (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
        }
      );
  }

  placeOrder() {
    if (!this.UserDetails.firstName || !this.UserDetails.phone) {
      this.userService.toast.snackbarError('Please First Fill User Details');
      this.router.navigate(['/myprofile']);
    }
    if (this.showAddAddressForm && !this.addressId) {
      this.saveAddress();
    } else {
      this.payNow();
    }
  }

  payNow() {
    const options = {
      key: 'rzp_test_YxtKjBPh0dR7up',
      amount: Math.round(this.totalPrice * 100), // amount in paisa
      currency: 'INR',
      name: 'Dickkny',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      handler: this.paymentHandler.bind(this),
      prefill: {
        name: this.UserDetails.firstName + this.UserDetails?.lastName,
        email: this.UserDetails.email,
        contact: this.UserDetails.phone,
      },
      notes: {
        address: this.UserDetails.streetAddress,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', this.paymentFailed.bind(this));
    rzp1.open();
  }

  private paymentHandler(response: any) {
    // this.loaderService.showLoading();

    this.payBill(response.razorpay_payment_id);
    this.userService.toast.snackbarError('Payment Successfully');
    // alert(response.razorpay_payment_id);
    // alert(response.razorpay_order_id);
    // alert(response.razorpay_signature);
    // You can handle payment success actions here
  }

  private paymentFailed(response: any) {
    this.userService.toast.snackbarError('Payment Failed');
    // alert(response.error.code);
    // alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    // alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);
    // You can handle payment failure actions here
  }

  payBill(paymentid: any) {
    this.loaderService.showLoading();

    // Initialize an array to hold products data
    let products = [];

    // Iterate through each item in this.cartDetail
    for (let item of this.cartDetail) {
      // Extract productId, quantity, and size from each item
      let productId = item.productId._id;
      let productAmount = parseFloat(item.productId.price); // Convert price to a number if needed
      let productQty = item.quantity;
      let productSize = item.size;

      // Create an object for the current product and push it to products array
      products.push({
        productId: productId,
        productAmount: productAmount,
        productQty: productQty,
        productSize: productSize,
      });
    }

    // Construct the data object to be sent in the request
    let data = {
      userId: this.isLoggedInObject.loginid,
      products: products, // Assign the products array
      totalAmount: this.totalPrice, // Ensure this.totalPrice is set correctly
      paymentId: paymentid, // Ensure this.totalPrice is set correctly
      addressId: this.addressId
        ? this.addressId
        : this.UserDetails.multipleAddressArray[0]._id,
    };

    // Make the HTTP request
    this.categoryService.payBill(data).subscribe(
      (res: any) => {
        this.categoryService.isCartandWishlistCountCheck(true);
        this.router.navigate(['myorder']);
        this.loaderService.hideLoading();
        // Handle response as needed
      },
      (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  // payBill() {
  //   this.loaderService.showLoading();
  //    let data =  {
  //     "userId": this.isLoggedInObject.loginid,
  //     "products": [
  //       {
  //         "productId": "66313da5e5e1e2ac33e8773a",
  //         "productAmount": 100,
  //         "productQty":2,
  //         "productSize":"XL"
  //       },
  //       {
  //         "productId": "6642550cdead69db4b1cdd56",
  //         "productAmount": 200,
  //         "productQty":3,
  //         "productSize":"XXL"
  //       }
  //     ],
  //     "totalAmount": this.totalPrice
  //   }
  //     this.categoryService.payBill(data).subscribe(
  //       (res: any) => {
  //         this.loaderService.hideLoading();

  //       },
  //       (error: any) => {
  //         this.loaderService.hideLoading();
  //         this.userService.toast.snackbarError(error.error.error);
  //       }
  //     );
  //   }

  //   payNow() {
  //     var options = {
  //     "key": "rzp_test_YxtKjBPh0dR7up", // Enter the Key ID generated from the Dashboard
  //     "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     "currency": "INR",
  //     "name": "Acme Corp",
  //     "description": "Test Transaction",
  //     "image": "https://example.com/your_logo",
  //     "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     "handler": function (response){
  //         alert(response.razorpay_payment_id);
  //         alert(response.razorpay_order_id);
  //         alert(response.razorpay_signature)
  //     },
  //     "prefill": {
  //         "name": "Gaurav Kumar",
  //         "email": "gaurav.kumar@example.com",
  //         "contact": "9000090000"
  //     },
  //     "notes": {
  //         "address": "Razorpay Corporate Office"
  //     },
  //     "theme": {
  //         "color": "#3399cc"
  //     }
  // };
  // var rzp1 = new Razorpay(options);
  // rzp1.on('payment.failed', function (response){
  //         alert(response.error.code);
  //         alert(response.error.description);
  //         alert(response.error.source);
  //         alert(response.error.step);
  //         alert(response.error.reason);
  //         alert(response.error.metadata.order_id);
  //         alert(response.error.metadata.payment_id);
  // });
  //     // const RozarpayOptions = {
  //     //   description: 'Sample Razorpay demo',
  //     //   currency: 'INR',
  //     //   amount: 100,
  //     //   name: 'Sai',
  //     //   key: 'rzp_test_YxtKjBPh0dR7up',
  //     //   image: 'https://i.imgur.com/FApqk3D.jpeg',
  //     //   prefill: {
  //     //     name: 'sai kumar',
  //     //     email: 'sai@gmail.com',
  //     //     phone: '9898989898'
  //     //   },
  //     //   theme: {
  //     //     color: '#6466e3'
  //     //   },
  //     //   modal: {
  //     //     ondismiss:  () => {
  //     //       console.log('dismissed')
  //     //     }
  //     //   }
  //     // }

  //     // const successCallback = (paymentid: any) => {
  //     //   console.log(paymentid,"paymentid");
  //     // }

  //     // const failureCallback = (e: any) => {
  //     //   console.log(e,"failureCallback");
  //     // }

  //     // Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  //   }
}

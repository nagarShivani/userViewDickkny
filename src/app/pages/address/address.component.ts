import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  userDetails: any = {};
  isLoggedInObject: any;
  addressId: any;
  states:any;
  constructor(private userService: UserService,
    private loaderService: LoaderService,
    private categoryService: CategoryService,
  private router: Router,
  private route: ActivatedRoute) {
    this.getIndiaState();
   this.userDetails.country = "India"
    this.route.params.subscribe(params => {
      this.addressId = params['addressId'];
      this.getIsLoggedInObject();
    });
  this.getIsLoggedInObject();
}

getIndiaState(){
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
    'West Bengal'
  ];
}

getIsLoggedInObject() {
  const storedUserInfo = localStorage.getItem('isLoggedIn');
  if (storedUserInfo) {
    try {
      this.isLoggedInObject = JSON.parse(storedUserInfo);
      if(this.addressId){this.getAddressById(this.isLoggedInObject,this.addressId);}
    } catch (error) {
      console.error('Error parsing JSON from local storage:', error);
      this.isLoggedInObject = {};
    }
  } else {
    this.isLoggedInObject = {};
  }
}

getAddressById(userId: any,addressId:any) {
  this.loaderService.showLoading();
  this.categoryService.getAddressById(userId.loginid,addressId).subscribe(
    (res: any) => {
      this.userDetails = res.address;
      this.loaderService.hideLoading();
    },
    (error: any) => {
      this.loaderService.hideLoading();
      this.userService.toast.snackbarError(error.error.error);
    }
  );
}


submitAddress(){
  if(this.addressId){
    this.updateAddress();
  } else {
    this.saveAddress();
  }
}


updateAddress() {
  this.loaderService.showLoading();
  this.categoryService.updateAddress(this.isLoggedInObject.loginid,this.addressId,this.userDetails).subscribe(
    (res: any) => {
      this.userService.toast.snackbarError(res.message);
      this.router.navigate(['/myaddress'])
      this.userDetails = {};
      this.loaderService.hideLoading();
    },
    (error: any) => {
      this.loaderService.hideLoading();
      this.userService.toast.snackbarError(error.error.error);
    }
  );
}

saveAddress() {
  this.loaderService.showLoading();
  this.categoryService.addAddress(this.isLoggedInObject.loginid,this.userDetails).subscribe(
    (res: any) => {
      this.userService.toast.snackbarError(res.message);
      this.router.navigate(['/myaddress'])
      this.userDetails = {};
      this.loaderService.hideLoading();
    },
    (error: any) => {
      this.loaderService.hideLoading();
      this.userService.toast.snackbarError(error.error.error);
    }
  );
}

}

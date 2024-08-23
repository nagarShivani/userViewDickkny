import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent {
  allCoupons: any;

  constructor(private userService:UserService,
    private loaderService: LoaderService,
  private CategoryService: CategoryService){
    this.getAllCoupons();

  }


  getAllCoupons(){
    this.loaderService.showLoading();
    this.CategoryService.getAllCoupons().subscribe(
      (res: any) => {
        this.allCoupons = res;
          this.loaderService.hideLoading();
        } ,
      (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  copyCouponCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      this.userService.toast.snackbarError("Coupon code copied to clipboard: "+ code);
    }).catch((error) => {
      this.userService.toast.snackbarError("Failed to copy coupon code");
    });
}


}

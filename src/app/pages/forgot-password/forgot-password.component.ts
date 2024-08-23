import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email:any;
  constructor(private loaderService: LoaderService,
    private userService: UserService
  ){

  }


  submit(){
    this.loaderService.showLoading();
    let payload={
      "email":this.email,
    }
    this.userService.forgotUser({ body: payload }).subscribe(
      (res: any) => {
        this.loaderService.hideLoading();
          this.userService.toast.snackbarError(res.message);
        } ,
      (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.message);
      }
    );
  }
}

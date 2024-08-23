import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  newPassword:any
  confirmPassword:any
  id: any;
  token: any;
  constructor(private userService:UserService,
    private router :Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService)
    {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.token = params['token'];
    });
  }

  resetPassword(){
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!this.newPassword.match(passwordPattern)) {
      this.userService.toast.snackbarError('Password must contain at least 8 characters including uppercase, lowercase, number, and special character');
      return;
    }

      this.loaderService.showLoading();
      let payload = {
        "password":this.newPassword
      }
      this.userService.resetPassword(this.id,this.token,payload).subscribe(
        (res: any) => {
          this.userService.toast.snackbarError("Password Reset Sucessfully");
          this.router.navigate(['signin']);
          this.loaderService.hideLoading();
        },
        (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
        }
      );
  }

}

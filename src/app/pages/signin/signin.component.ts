import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  registerEmail:any;
  registerPassword: string = '';
  mobile:any;
  // showmsg:boolean=false
  correctemailmsg: boolean=false;
  validateNumber: boolean=false;
  username: any;
  loginEmail:any;
  loginPassword:any
  constructor(private userService:UserService,
    private router :Router,
    private loaderService: LoaderService,
    private authService: SocialAuthService)
    {

  }


  checkEmail(event:any) {
    let inputValue = event.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (inputValue.match(emailRegex)) {
      this.correctemailmsg = false;
    } else {
      this.correctemailmsg = true;
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // validateNumbercheck(event:any){
  //   let inputValue:any = event.target.value;
  //   const numberRegex = /^[0-9]+$/;
  //   if (inputValue.length > 10) {
  //     this.mobile = inputValue.slice(0, 10);
  //   }
  //   if ( this.mobile.length === 10 && this.mobile.match(numberRegex)) {
  //     this.validateNumber =false
  //     // You can add further logic for valid number
  //   } else {
  //     this.validateNumber =true

  //     // You can add further logic for invalid number
  //   }
  // }

  loginSubmit(){
    if(!this.loginEmail || !this.loginPassword){
      // this.showmsg = true
      this.userService.toast.snackbarError("Please Enter Email or Password");
      return
    }
    this.loaderService.showLoading();
    let payload={
      "email":this.loginEmail,
      "password":this.loginPassword,
    }
    this.userService.logInUser({ body: payload }).subscribe(
      (res: any) => {
          this.loaderService.hideLoading();
          this.router.navigate(['dashboard']);
          localStorage.setItem('isLoggedIn', JSON.stringify(res));
          this.userService.toast.snackbarError(res.message);
          this.userService.isLogInCheck(true)
        } ,
      (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
      }
    );
  }


  registerSubmit(){
  if(!this.registerEmail || !this.registerPassword){
    // this.showmsg = true
    this.userService.toast.snackbarError("Please Enter Email or Password");
    return
  }

  if (!this.isValidEmail(this.registerEmail)) {
    this.userService.toast.snackbarError('Invalid email format');
    return;
  }
console.log(this.registerPassword);

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!this.registerPassword.match(passwordPattern)) {
    this.userService.toast.snackbarError('Password must contain at least 8 characters including uppercase, lowercase, number, and special character');
    return;
  }
  // if(this.validateNumber || this.correctemailmsg){
  //   return
  // }
  this.loaderService.showLoading();
  let payload={
    "email":this.registerEmail,
    "password":this.registerPassword,
    // "number":this.mobile,
    // "username":this.username,
  }
  this.userService.signUpUser({ body: payload }).subscribe(
    (res: any) => {
      this.loaderService.hideLoading();
        this.router.navigate(['dashboard']);
        localStorage.setItem('isLoggedIn', JSON.stringify(res));
        this.userService.toast.snackbarError(res.message);
        this.userService.isLogInCheck(true)
      } ,
    (error: any) => {
        this.loaderService.hideLoading();
        this.userService.toast.snackbarError(error.error.error);
    }
  );
}

forgotPassword(){
  this.router.navigate(['forgot-password']);
}

// signInWithGoogle(): void {
//   this.loaderService.showLoading();
//   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
//     .then((user: SocialUser) => {
//       // Handle successful Google sign-in
//       console.log('Google sign-in successful', user);
//       this.loaderService.hideLoading();
//       // Redirect or perform further actions as needed
//     })
//     .catch((error: any) => {
//       // Handle errors
//       console.error('Error during Google sign-in', error);
//       this.loaderService.hideLoading();
//       // Display error message or perform fallback actions
//     });
// }

signInWithGoogle(): void {
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
}


// signInWithGoogle(): void {
//   debugger
//   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
// }

signInWithFacebook(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
}

togglePasswordVisibility(): void {
  // inputEl = document.getElementById('singin-password-2');
  // if (inputEl.getAttribute('type') === 'password') {
  //     inputEl.setAttribute('type', 'text');
  // } else {
  //     inputEl.setAttribute('type', 'password');
  // }
}


}

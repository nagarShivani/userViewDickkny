import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  email:any
  constructor(private userService:UserService,
    private loaderService: LoaderService)
    {

  }

  subscribeNewsletter(){
    this.loaderService.showLoading();
    let payload={
      "email":this.email,
    }
    this.userService.sendEmail({ body: payload }).subscribe(
      (res: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(res.message);
        } ,
      (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

  doNotShowPopup(value:any){
    console.log(value,"value")
    localStorage.setItem('isDoNotShowPopup', JSON.stringify(false));
    
  }

}
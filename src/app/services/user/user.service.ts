import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/core/constant';
import { ApiService } from '../api.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  isLogIn = new BehaviorSubject('');
  apiUrl: string = AppSettings.API_ENDPOINT;
  // apiUrl: string = "https://dickkny.vercel.app/";
  accessToken: any = "";


  isLogInCheck(data:any){
    this.isLogIn.next(data)
  }


  signUpUser(data:any) {
    const { body} =  data;
    return this.request({
      path:`${this.apiUrl}signup`,
      method:"POST",
      body
    });
  }

  logInUser(data:any) {
    const { body} =  data;
    return this.request({
      path:`${this.apiUrl}login`,
      method:"POST",
      body
    });
  }

  forgotUser(data:any) {
    const { body} =  data;
    return this.request({
      path:`${this.apiUrl}forgot`,
      method:"POST",
      body
    });
  }

  sendEmail(data:any) {
    const { body} =  data;
    return this.request({
      path:`${this.apiUrl}sendEmail`,
      method:"POST",
      body
    });
  }

  getUserDetailById(id:any){
    return this.request({
      path:`${this.apiUrl}getUserDetailById/${id}`,
      method:"GET",
    });
  }  

  resetPassword(id:any,token :any,data:any){
    return this.request({
      path:`${this.apiUrl}reset/${id}/${token}`,
      method:"POST",
      body:data
    });
  }  

}

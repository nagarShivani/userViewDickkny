import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { NewsletterComponent } from './popup/newsletter/newsletter.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { MyorderComponent } from './pages/myorder/myorder.component';
import { MypaymentsComponent } from './pages/mypayments/mypayments.component';
import { MyaddressComponent } from './pages/myaddress/myaddress.component';
import { BulkInquiryComponent } from './pages/bulk-inquiry/bulk-inquiry.component';
import { CouponComponent } from './pages/coupon/coupon.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from './services/user/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './services/toast/component/toast/toast.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SingleBlogComponent } from './pages/single-blog/single-blog.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { QuickViewComponent } from './popup/quick-view/quick-view.component';
import { DatePipe } from '@angular/common';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { OwlCarouselSliderComponent } from './shared/owl-carousel-slider/owl-carousel-slider.component';
import { AddressComponent } from './pages/address/address.component';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NewsletterComponent,
    SigninComponent,
    AboutComponent,
    ProductComponent,
    ProductListComponent,
    WishlistComponent,
    CartComponent,
    CheckoutComponent,
    DashboardComponent,
    MyprofileComponent,
    MyorderComponent,
    MypaymentsComponent,
    MyaddressComponent,
    BulkInquiryComponent,
    CouponComponent,
    ContactComponent,
    BlogComponent,
    ForgotPasswordComponent,
    SingleBlogComponent,
    QuickViewComponent,
    ResetPasswordComponent,
    OwlCarouselSliderComponent,
    AddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MatSnackBarModule ,
  ],
  providers: [
    Ng5SliderModule,
    DatePipe,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('561602290896109'),
          }
        ],
      } as SocialAuthServiceConfig,
    },
    ToastComponent, MatSnackBar],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }

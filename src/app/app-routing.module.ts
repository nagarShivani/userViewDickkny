import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
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
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SingleBlogComponent } from './pages/single-blog/single-blog.component';
import { AuthGuard } from './auth.guard';
import { QuickViewComponent } from './popup/quick-view/quick-view.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AddressComponent } from './pages/address/address.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsandcondiionsComponent } from './pages/termsandcondiions/termsandcondiions.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { ReturnComponent } from './pages/return/return.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent, canMatch: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'product-list/:id', component: ProductListComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'myorder', component: MyorderComponent, canActivate: [AuthGuard] },
  {
    path: 'mypayments',
    component: MypaymentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myaddress',
    component: MyaddressComponent,
    canActivate: [AuthGuard],
  },

  { path: 'bulk-inquiry', component: BulkInquiryComponent },
  { path: 'coupon', component: CouponComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms&condition', component: TermsandcondiionsComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'return', component: ReturnComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'single-blog/:id', component: SingleBlogComponent },
  {
    path: 'reset-password/:id/:token',
    component: ResetPasswordComponent,
    canMatch: [AuthGuard],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'address', component: AddressComponent },
  { path: 'address/:addressId', component: AddressComponent },
  { path: 'quick-view', component: QuickViewComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

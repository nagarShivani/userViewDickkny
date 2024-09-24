import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/core/constant';
import { ApiService } from '../api.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ApiService {
  isCartandWishlist = new BehaviorSubject('');
  apiUrl: string = AppSettings.API_ENDPOINT;
  accessToken: any = '';

  isCartandWishlistCountCheck(data: any) {
    this.isCartandWishlist.next(data);
  }

  getAllCoupons() {
    return this.request({
      path: `${this.apiUrl}getAllCoupons`,
      method: 'GET',
    });
  }

  addEnquiry(data: any) {
    return this.request({
      path: `${this.apiUrl}addEnquiry`,
      method: 'POST',
      body: data,
    });
  }

  addgetInTouch(data: any) {
    return this.request({
      path: `${this.apiUrl}addgetInTouch`,
      method: 'POST',
      body: data,
    });
  }

  getProductByID(id: any) {
    return this.request({
      path: `${this.apiUrl}getAllProductsById/${id}`,
      method: 'GET',
    });
  }

  getAllproducts() {
    return this.request({
      path: `${this.apiUrl}getAllProduct`,
      method: 'GET',
    });
  }

  addToCart(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.apiUrl}addTocart`,
      method: 'POST',
      body,
    });
  }

  removeFromCart(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.apiUrl}removeFromCart`,
      method: 'POST',
      body,
    });
  }

  addToWishlist(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.apiUrl}addToWishlist`,
      method: 'POST',
      body,
    });
  }

  removeFromWishList(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.apiUrl}removeFromWishList`,
      method: 'POST',
      body,
    });
  }

  getCountOfCartAndWishListOfUser(id: any) {
    return this.request({
      path: `${this.apiUrl}getCountOfCartAndWishListOfUser/${id}`,
      method: 'GET',
    });
  }

  getWishListOfUser(id: any) {
    return this.request({
      path: `${this.apiUrl}getWishListOfUser/${id}`,
      method: 'GET',
    });
  }

  getCartOfUser(id: any) {
    return this.request({
      path: `${this.apiUrl}getCartOfUser/${id}`,
      method: 'GET',
    });
  }

  getAllBrand() {
    return this.request({
      path: `${this.apiUrl}getAllBrand`,
      method: 'GET',
    });
  }

  getAllCategory() {
    return this.request({
      path: `${this.apiUrl}getAllCategory`,
      method: 'GET',
    });
  }

  
  getProductByCategoryId(id: any) {
    return this.request({
      path: `${this.apiUrl}getProductByCategoryId/${id}`,
      method: 'GET',
    });
  }

  getAllBanner() {
    return this.request({
      path: `${this.apiUrl}getAllBanner`,
      method: 'GET',
    });
  }

  getAllBlog() {
    return this.request({
      path: `${this.apiUrl}getAllBlog`,
      method: 'GET',
    });
  }

  getAllBlogById(id: any) {
    return this.request({
      path: `${this.apiUrl}getAllBlogById/${id}`,
      method: 'GET',
    });
  }

  getUserDetailById(id: any) {
    return this.request({
      path: `${this.apiUrl}getUserDetailById/${id}`,
      method: 'GET',
    });
  }

  updateUserDetails(id: any, data: any) {
    return this.request({
      path: `${this.apiUrl}updateUserDetails/${id}`,
      method: 'PUT',
      body: data,
    });
  }

  applyCoupon(data: any) {
    return this.request({
      path: `${this.apiUrl}applyCoupon`,
      method: 'POST',
      body: data,
    });
  }

  payBill(data: any) {
    return this.request({
      path: `${this.apiUrl}payBill`,
      method: 'POST',
      body: data,
    });
  }

  getMyOrders(id: any) {
    return this.request({
      path: `${this.apiUrl}getMyOrders/${id}`,
      method: 'GET',
    });
  }

  addAddress(userId: any, data: any) {
    return this.request({
      path: `${this.apiUrl}addAddress/${userId}`,
      method: 'POST',
      body: data,
    });
  }

  getAllProductApiforFilter(data: any) {
    return this.request({
      path: `${this.apiUrl}getAllProductApiforFilter`,
      method: 'POST',
      body: data,
    });
  }

  updateCart(data: any) {
    return this.request({
      path: `${this.apiUrl}updateCart`,
      method: 'POST',
      body: data,
    });
  }

  deleteAddress(userId: any, addressId: any) {
    return this.request({
      path: `${this.apiUrl}deleteAddress/${userId}/${addressId}`,
      method: 'DELETE',
    });
  }

  getAddressById(userId: any, addressId: any) {
    return this.request({
      path: `${this.apiUrl}getAddressById/${userId}/${addressId}`,
      method: 'GET',
    });
  }

  updateAddress(userId: any, addressId: any, data: any) {
    return this.request({
      path: `${this.apiUrl}updateAddress/${userId}/${addressId}`,
      method: 'PUT',
      body: data,
    });
  }


  
  getCatSizeColorBrandPrice() {
    return this.request({
      path: `${this.apiUrl}getCatSizeColorBrandPrice`,
      method: 'GET',
    });
  }

  // searchProducts(searchTerm: any) {
  //   console.log(searchTerm);
  //   console.log(`Requesting: ${this.apiUrl}searchProduct?name=${searchTerm}`);

  //   return this.request({
  //     path: `${this.apiUrl}searchProduct?name=` + searchTerm,
  //     method: 'GET',
  //   });
  // }

    searchProducts(searchTerm: any) {
    console.log(searchTerm);
    console.log(`Requesting: ${this.apiUrl}searchProduct?name=${searchTerm}`);

    return this.request({
      path: `${this.apiUrl}searchProduct?name=` + searchTerm,
      method: 'GET',
    });
  }
}

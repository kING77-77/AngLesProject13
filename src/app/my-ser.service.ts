import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MySerService {
  constructor(public http: HttpClient, private router: Router) {}

  public isDirty = false;
  public keyword: string = '';
  public userData: any;
  public products: any;
  public isLoading = false;
  public categories: any[] = [];
  public brands: any[] = [];

  getAll() {
    const token = localStorage.getItem('token');
    let url = 'https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=21';
 
    return this.http.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    
    });
  }

  getCategories() {
    const token = localStorage.getItem('token');
    return this.http.get('https://api.everrest.educata.dev/shop/products/categories', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getBrands() {
    const token = localStorage.getItem('token');
    return this.http.get('https://api.everrest.educata.dev/shop/products/brands', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  signIn(data: any) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_in', data);
  }

  signUp(data: any) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_up', data);
  }

  getUserData(token: string) {
    return this.http.get('https://api.everrest.educata.dev/auth', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.userData = null;
    this.products = null;
    this.router.navigate(['/auth']);
  }

  postReview(productId: string, rating: number, comment: string, reviewerName: string) {
    const token = localStorage.getItem('token');
    return this.http.post('https://api.everrest.educata.dev/shop/products/review', {
      productId,
      rating,
      comment,
      reviewerName
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  addToCart(productId: string, quantity: number = 1) {
    const token = localStorage.getItem('token');
    
    const body = { productId, quantity };
    console.log('Отправляемые данные:', body);
    console.log('Токен:', token);
  
    return this.http.post("https://api.everrest.educata.dev/shop/cart/product", body, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  getCart() {
    const token = localStorage.getItem('token');
    
    return this.http.get("https://api.everrest.educata.dev/shop/cart", {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateCartItem(itemId: string, quantity: number) {
    const token = localStorage.getItem('token');
    const url = `https://api.everrest.educata.dev/shop/cart/update/${itemId}`;
    const body = { quantity };
    return this.http.put(url, body, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  removeCartItem(itemId: string) {
    const token = localStorage.getItem('token');
    const url = `https://api.everrest.educata.dev/shop/cart/remove/${itemId}`;
    return this.http.delete(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getProductById(id: string) {
    const token = localStorage.getItem('token');
    const url = `https://api.everrest.educata.dev/shop/products/${id}`;
    return this.http.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
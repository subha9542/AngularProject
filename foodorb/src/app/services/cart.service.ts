import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];

  constructor() { }

  addToCart(value){
      this.cart.push(value)
  }

  clearCart(){
    this.cart = [];
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'foodorb-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any;
  createdOn;
    userId = window.sessionStorage.getItem('id')
  headElements = ['Id. No:', 'Item Name', 'Cost']

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.cartItems = JSON.parse(window.sessionStorage.getItem('cart'));
    //console.log(this.cartItems)
  }
  placeOrder() {
    if (sessionStorage.getItem('cart') === null) {
      alert('Please add items to cart to place order')
      this.router.navigate(['/home']);
    } else {
      const orderTime = new Date().getTime();
      this.http.patch('http://localhost:3000/users/' + this.userId, { cart_items: this.cartItems,orderTime : orderTime }).subscribe((response: any) => {
        //console.log(response)
        return response
      })
      //console.log(orderTime)
      sessionStorage.setItem('orderPlaced', 'Placed');
      this.router.navigate(['/trackOrder']);
      sessionStorage.removeItem('cart');
    }

  }
  clearCart() {
    this.cartItems = [];
    this.http.patch('http://localhost:3000/users/' + this.userId, { cart_items: this.cartItems }).subscribe((response: any) => {
      return response
    })
    sessionStorage.removeItem('cart');
  }
}

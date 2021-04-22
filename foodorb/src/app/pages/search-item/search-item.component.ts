import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'foodorb-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  feed: any;
  userId = window.sessionStorage.getItem('id')
  itemsRecieved: any;
  createdOn;
  cartItems: any

  headElements = ['Restaurant', 'Name', 'Salary', 'Age'];
  constructor(private http: HttpClient, private router: Router) {
    this.feed = this.router.getCurrentNavigation().extras.state
    //console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    //this.items = this.route.snapshot.paramMap.get('item')
    //console.log(this.items)
  }

  addToCart(itemId) {
    let item = this.feed.find((s) => {
      return s.id === itemId;
    });
    //console.log(item);
    let cartData: any = [];
    let data = sessionStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    cartData.push(item);
    this.updateCartData(cartData);
    window.sessionStorage.setItem('cart', JSON.stringify(cartData));
    alert('Item added to cart!! :-)\n');
    this.router.navigate(['/cart']);
    //console.log(window.sessionStorage.getItem('cart'))
  }

  updateCartData(cartData) {
    this.cartItems = cartData;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }


  placeOrder(itemId) {
    this.addToCart(itemId)
    const orderTime = new Date().getTime();
    this.http.patch('http://localhost:3000/users/' + this.userId, { cart_items: this.cartItems, orderTime: orderTime }).subscribe((response: any) => {
      //console.log(response)
      return response
    })
    sessionStorage.setItem('orderPlaced', 'Placed');
    this.router.navigate(['/trackOrder']);
    sessionStorage.removeItem('cart');

  }
}

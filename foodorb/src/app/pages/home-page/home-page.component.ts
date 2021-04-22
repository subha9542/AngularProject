import { Component, OnInit, ErrorHandler, HostListener } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Items } from 'src/app/services/items';
import { Router } from '@angular/router';

@Component({
  selector: 'foodorb-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public feed: Array<Items>;
  userId = window.sessionStorage.getItem('id')
  itemsRecieved: Array<Items>;
  createdOn;
  cartItems: Array<Items>;

  headElements = ['Restaurant', 'Name', 'Salary', 'Age'];
  constructor(private http: HttpClient,private router : Router) {
  }
  ngOnInit() {
    this.http.get<Items[]>("http://localhost:3000/feed")
      .subscribe(
        data => this.feed = data);
  }

  addToCart(itemId) {
    let item = this.feed.find((s) => {
      return s.id === itemId;
    });
    //console.log(item);
    let cartData:any = [];
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

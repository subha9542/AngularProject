import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'foodorb-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {

  order_status;
  orderCancelled = true;
  orderedTime;
  time_remaining = 20;
  userId = window.sessionStorage.getItem('id')
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.order_status = sessionStorage.getItem('orderPlaced')
    if (this.order_status === 'Placed') {
      this.orderCancelled = false;
    }
  }

  @HostListener('window:reload')
  @HostListener('window:load')
  getDeliveryStatus() {
    this.http.get('http://localhost:3000/users?id=' + this.userId).subscribe((response: any) => {
      this.orderedTime = response[0].orderTime;
      return response
    })
    const currentTime = new Date().getTime();
    console.log('cuttent' + currentTime)
    if (this.orderedTime + 60000 >= currentTime) {
      this.order_status === 'Picked Up'
    }

    if (this.orderedTime + 90000 >= currentTime) {
      this.order_status === 'Delivered'
    }
    return this.order_status
  }

  cancelOrder() {
    let userId = window.sessionStorage.getItem('id')
    this.http.patch('http://localhost:3000/users/' + userId, { cart_items: [], orderTime : 0 }).subscribe((response: any) => {
      return response
    })
    sessionStorage.removeItem('orderPlaced')
    this.orderCancelled = true
  }

  goHome() {
    this.router.navigate(['/home']);

  }
}

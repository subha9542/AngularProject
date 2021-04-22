import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Items } from './items';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  public items:  any = [];
  constructor(private http: HttpClient, private router: Router, private cart: CartService, private user_service : UserService) { }
  ngOnInit() {
    this.getItems()
  }
  ngAfterViewInit() {
    this.getItems()
  }

  @HostListener('window:beforeunload')
  getItems() {
    this.http.get<Items[]>("http://localhost:3000/feed")
      .subscribe(
        data => this.items = data);
    return this.items
  }
}

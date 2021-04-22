import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Items } from '../../services/items';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'foodorb-includes',
  templateUrl: './includes.component.html',
  styleUrls: ['./includes.component.scss']
})
export class IncludesComponent implements OnInit {

  public user_details: any;
  items: any;
  item: any = [];
  search_item = "";
  public errorHandler: ErrorHandler;
    name:string
  constructor(private user: UserService, private router: Router, private http: HttpClient) {
    this.name = window.sessionStorage.getItem("name");
     }
 
  ngOnInit() {
    this.http.get<Items[]>("http://localhost:3000/feed").subscribe(
      data => this.items = data);
  }

  Search() {
    this.item = this.items.find(
      (s) => {
        var re = this.search_item.toLocaleLowerCase();
        var str = s.product.toLocaleLowerCase();
        if (str.search(re) === -1) {
          //console.log('no match')
        } else {
          //return true
          this.item.push(s)
        }
      },
      //console.log(this.item),
      this.router.navigate(['/searchResults'], { state : this.item })

    );
  }
  logOut() {
    return this.user.logout();
  }
}

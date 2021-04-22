import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public users: any = [];
  public user: any = [];
  public items: any = [];
  email_check: any;
  constructor(private http: HttpClient, private router: Router, private cart: CartService) { }

  login(model: { email: string, password: string }) {

    /*this.http.get<Users[]>("http://localhost:3000/users").subscribe(
      data => this.users = data);
    this.user = this.users.find(
      (s) => {
        return s.email === model.email;
      }
    );*/
    
    return this.http.post("http://localhost:3000/login", model)
      .subscribe((response: any) => {
        // window.localStorage.setItem("access-token", response.accessToken)
        window.sessionStorage.setItem("access-token", response.accessToken);
        this.UserDetails(model.email);
        this.router.navigateByUrl("/home");
        return response
      }, () => {
          this.router.navigateByUrl("/not-authorized");

      })
  }

  forgot(email: string) {
    this.http.get("http://localhost:3000/users?email=" + email)
      .subscribe((response: any) => {
        if (response.length === 0) {
          alert('No User Found!')
        } else {
          alert('Email is sent!')
        }
        this.router.navigateByUrl("/login");
      })
  }

  UserDetails(email : string) {
    return this.http.get("http://localhost:3000/users?email=" + email)
      .subscribe((response: any) => {
        window.sessionStorage.setItem("user_info", response[0]);
        window.sessionStorage.setItem("email", response[0].email);
        window.sessionStorage.setItem("password", response[0].password);
        window.sessionStorage.setItem("id", response[0].id);
        window.sessionStorage.setItem("name", response[0].Name);
        window.sessionStorage.setItem("address", response[0].addresses[0].address);
        window.sessionStorage.setItem("addresses", response[0].addresses);
        window.sessionStorage.setItem("payments", response[0].payments);
        return response
      }, () => {
        window.sessionStorage.setItem("email", "No email found");
        window.sessionStorage.setItem("id", "No ID found");
        window.sessionStorage.setItem("name", "No Name found");
      })
  }
  getUserById(id) {
    return this.http.get('http://localhost:3000/users?id='+id)
  }


  register(model) {
    return this.http.post("http://localhost:3000/register", model)
      .subscribe((response: any) => {
        alert('Successfully Registered!Please Login to continue!')
        this.router.navigateByUrl("/login");
        return response;
      }, () => {
        this.router.navigateByUrl("/not-authorized");
      })
  }
  addUserAddressById(id, updatedData) {
    return this.http.patch('http://localhost:3000/users/' + id, updatedData)
  }
  editUserAddressById(id, updatedData) {
    return this.http.patch('http://localhost:3000/users/'+ id, updatedData).subscribe((response: any) => {
      return response
    })
  }
  addUserPaymentById(id, updatedData) {
    return this.http.patch('http://localhost:3000/users/' + id, updatedData)
  }
  editUserPaymentById(id, updatedData) {
    return this.http.patch('http://localhost:3000/users/' + id, updatedData).subscribe((response: any) => {
      return response
    })
  }
  getItems() {
    return this.items
  }


  logout() {
    this.cart.clearCart();
   let userId = window.sessionStorage.getItem('id')
    this.http.patch('http://localhost:3000/users/' + userId, { cart_items: [] }).subscribe((response: any) => {
      return response
    })
    window.sessionStorage.removeItem("access-token");
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

}

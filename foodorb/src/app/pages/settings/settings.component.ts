import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'foodorb-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  openAddressForm = false
  openPaymentForm = false
  email = window.sessionStorage.getItem('email')
  password = window.sessionStorage.getItem('password')
  address_from_db = JSON.stringify(window.sessionStorage.getItem('addresses'))
 payments_from_db = JSON.stringify(window.sessionStorage.getItem('payments'))
  id = window.sessionStorage.getItem('id')
  showEditAdd = false
  showEditPayment = false
  address = []
  payment = []
  
  addresses: any = [];
  payments: any = [];
  updateAddress: any = {
    name: "",
    address:""
  };
  addAddress: any = {
    name: "",
    address: ""
  };
  updatePayment: any = {
    name: "",
    number: ""
  };
  addPayment: any = {
    name: "",
    addnumberress: ""
  };
  constructor(private http: HttpClient, private route: ActivatedRoute, private user: UserService, private router : Router) { }

  ngOnInit(): void {
      }
  paymentList() {
    this.openAddressForm = false;
    this.openPaymentForm = true;
    this.http.get("http://localhost:3000/users?email=" + this.email)
      .subscribe((response: any) => {
        this.payments = response[0].payments;
        return response
      }
      )

  }
  addressList() {
    this.openAddressForm = true;
    this.openPaymentForm = false;
    this.http.get("http://localhost:3000/users?email=" + this.email)
      .subscribe((response: any) => {
        this.addresses = response[0].addresses;
        return response
      }
      )
  }

  addAddressDB() {
    this.showEditAdd = false;
    this.address = [];
    console.log(this.addresses)
    if (this.addresses) {
      for (var add of this.addresses) {
        this.address.push(add)
      }
    }
    this.address.push(this.addAddress)
    //console.log(this.address)
    return this.user.addUserAddressById(this.id, { addresses: this.address }).subscribe((response: any) => {
      //console.log(response);
      this.addressList()
      this.router.navigateByUrl("/settings");
      //alert('Address added!! :-)\n');
      return response
    })

  }
  EditAdd() {
    this.showEditAdd = true
  }
  UpdateAdd() {
    this.showEditAdd = false
    this.user.editUserAddressById(this.id, { addresses: this.addresses })

  }
  DeleteAdd(AddressName: string) {
    this.showEditAdd = false
    this.address = [];
    for (var add of this.addresses) {
      console.log(add.name, AddressName)
      if (add.name !== AddressName)
        this.address.push(add)
    }
    return this.user.addUserAddressById(this.id, { addresses: this.address }).subscribe((response: any) => {
      this.addressList()
      this.router.navigateByUrl("/settings");

      //return response
    })

  }

  addPaymentDB() {
    this.showEditPayment = false
    this.payment = [];
    if (this.payments) {
      for (var pay of this.payments) {
        this.payment.push(pay)

      }
    }
    this.payment.push(this.addPayment)
    return this.user.addUserPaymentById(this.id, { payments: this.payment }).subscribe((response: any) => {
      console.log(response);
      this.paymentList()
      this.router.navigateByUrl("/settings");
     // alert('Payment added!! :-)\n');
      return response
    })

  }
  EditPay() {
    this.showEditPayment = true
  }
  UpdatePay() {
    this.showEditPayment = false
    this.user.editUserPaymentById(this.id, { payments: this.payments })

  }
  DeletePay(PaymentNumber) {
    this.showEditPayment = false
    this.payment = [];
    for (var pay of this.payments) {
      if (pay.number !== PaymentNumber)
        this.payment.push(pay)
    }
    return this.user.addUserPaymentById(this.id, { payments: this.payment }).subscribe((response: any) => {
      console.log(response);
      this.paymentList()
      this.router.navigateByUrl("/settings");

      //return response
    })

  }
}

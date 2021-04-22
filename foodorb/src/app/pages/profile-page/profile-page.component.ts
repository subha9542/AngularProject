import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foodorb-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  name = window.sessionStorage.getItem("name");
  email = window.sessionStorage.getItem("email");
  desc = window.sessionStorage.getItem("desc");
  profession = window.sessionStorage.getItem("profession");
  address = window.sessionStorage.getItem("address");
  constructor() { }

  ngOnInit(): void {
  }

}

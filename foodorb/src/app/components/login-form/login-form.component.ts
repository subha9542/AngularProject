import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'foodorb-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  model = {
    email: "",
    password: ""
  }

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    return this.user.login(this.model);
  }
  registerPage() {
    this.router.navigate(['register']);
  }
  forgotPassword() {
    this.router.navigate(['forgot']);

  }
}

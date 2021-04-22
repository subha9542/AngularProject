import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'foodorb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    return this.user.register(this.model);
  }
  loginPage() {
      this.router.navigate(['login']);
  }

}

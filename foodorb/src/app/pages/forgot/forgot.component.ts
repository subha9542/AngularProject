import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'foodorb-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  email_id: any = "";
  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  forgot() {
    return this.user.forgot(this.email_id);
  }
}

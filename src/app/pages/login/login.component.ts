import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string;

  constructor(private route: Router) {

  }

  login() {
    sessionStorage.setItem('user', this.username)
    this.route.navigate(['home'])
  }

}

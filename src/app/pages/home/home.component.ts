import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  username: string | null;

  ngOnInit() {
    this.username = sessionStorage.getItem('user');
  }
}

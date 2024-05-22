import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  username: string | null;
  listUsers: User[] = [];
  totalUsers: number

  constructor(private userService: UsersService){};

  ngOnInit() {
    this.username = sessionStorage.getItem('user');
    this.getListUsers();
  }

  getListUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        this.listUsers = response

        this.totalUsers = this.listUsers.length
        console.log(this.totalUsers)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}

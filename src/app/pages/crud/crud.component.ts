import { Component, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewUserComponent } from './modal-view-user/modal-view-user.component';
import { ModalFormUserComponent } from './modal-form-user/modal-form-user.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'benefits', 'action'];
  dataSource: any;
  listUsers: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalUsers: number

  constructor(private userService: UsersService, public dialog: MatDialog){
    this.dataSource = new MatTableDataSource<any>(this.listUsers);
  }

  ngOnInit() {
    this.getListUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        this.listUsers = response
        this.dataSource = new MatTableDataSource<any>(this.listUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalUsers = this.listUsers.length
        console.log(this.totalUsers)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  deleteUser(user: User) {
    if (window.confirm("Confirma a exclusão do usuário? " + user.name)) {
      if (user.firebaseId) { // Verifica se user.firebaseId não é undefined
        this.userService.deleteUser(user.firebaseId).then(
          (response: any) => {
            // Lógica após a exclusão do usuário
          }
        ).catch(
          (error: any) => {
            // Lógica de tratamento de erro
            window.alert("Erro ao excluir o usuário!");
          }
        );
      } else {
        window.alert("ID do usuário é inválido!");
      }
    } else {
      window.alert("Exclusão cancelada!");
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModalViewUser(user: User) {
    this.dialog.open(ModalViewUserComponent, {
      width: '700px',
      height: '330px',
      data: user
    })
  }

  openModalAddUser() {
    this.dialog.open(ModalFormUserComponent, {
      width: '700px',
      height: '400px'
    }).afterClosed().subscribe(() => this.getListUsers());
  }

  openModalEditUser(user: User) {
    this.dialog.open(ModalFormUserComponent, {
      width: '700px',
      height: '400px',
      data: user
    }).afterClosed().subscribe(() => this.getListUsers());
  }
}

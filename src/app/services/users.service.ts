import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private dataBaseService: AngularFirestore) { }

  getAllUsers() {
    return this.dataBaseService.collection('users', user => user.orderBy('name')).valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

  addUser(user: any) {
    return this.dataBaseService.collection('users').add(user);
  }

  update(userId: string, user: any) {
    return this.dataBaseService.collection('users').doc('userId').update(user);
  }

  deleteUser(userId: string) {
    return this.dataBaseService.collection('users').doc('userId').delete();
  }
}

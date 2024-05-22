import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  formUser: FormGroup;

  planosSaude = [
    {
      id:1,
      descricao: 'Plano 300 Enfermaria'
    },
    {
      id:2,
      descricao: 'Plano 400 Enfermaria'
    },
    {
      id:3,
      descricao: 'Plano 500 Plus'
    }
  ]

  planosOdonto = [
    {
      id:1,
      descricao: 'Plano Basic'
    },
    {
      id:2,
      descricao: 'Plano Medium'
    },
    {
      id:3,
      descricao: 'Plano Plus'
    }
  ]

  constructor(public dialogRef: MatDialogRef<ModalFormUserComponent>, private formBuilder: FormBuilder, private userService: UsersService){}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      sector: [null, [Validators.required, Validators.minLength(2)]],
      role: [null, [Validators.required, Validators.minLength(5)]],
      healthPlan: [''],
      dentalPlan: [''],
    })
  }

  saveUser() {
    const objUserForm = this.formUser.getRawValue();
    //getRawValue - captura os dados em forma de objeto
    this.userService.addUser(objUserForm).then(
      (response: any) => {
        window.alert("Usuário salvo com sucesso!")
        this.closeModal();
      })
      .catch(err => {
        window.alert("Erro ao salvar usuário!")
        console.error(err);
      })
  }

  closeModal(){this.dialogRef.close()}

}

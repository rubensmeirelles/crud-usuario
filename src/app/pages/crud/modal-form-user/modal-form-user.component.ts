import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  formUser: FormGroup;
  editUser: boolean = false;

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

  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit() {
    this.buildForm();
    if (this.data && this.data.name) {
      this.editUser = true;
    }
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
    //validação para verificar se srá aberto o modal de adicionar ou editar o usuário
    if (this.data && this.data.name) {
      this.fillForm();
    }
  }

  //função para pegar o formulário construido pela função buildForm e preencher os campos que tem no data
  fillForm() {
    this.formUser.patchValue({
      name: this.data.name,
      email: this.data.email,
      sector: this.data.sector,
      role: this.data.role,
      healthPlan: this.data.healthPlan,
      dentalPlan: this.data.dentalPlan,
    })
  }

  saveUser() {
    //getRawValue - captura os dados em forma de objeto
    const objUserForm = this.formUser.getRawValue();

    //verifica se o data veio preenchido para salvar um novo usuário ou atualizar o cadastro
    if (this.data && this.data.name) {

      this.userService.update(this.data.firebaseId, objUserForm).then(
        (response: any) => {
          window.alert("Usuário editado com sucesso!")
          this.closeModal();
        })
        .catch(err => {
          window.alert("Erro ao editar usuário!")
          console.error(err);
        })

    } else {
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
  }

  closeModal(){this.dialogRef.close()}

}

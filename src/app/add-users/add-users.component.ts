import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  hide = true;
  formadd!: FormGroup;
  email = '';
  password = '';
  prenom = '';
  nom = '';
  profils = '';
  image = '';
  confirm = '';
  edit = false;
  user: any;
  id: any;
  private imageSelect: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
    private dialogRef: MatDialogRef<AddUsersComponent>,
    private url: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.formadd = this.formBuilder?.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(6)]],
      prenom: ['', [ Validators.required]],
      nom: ['', [Validators.required]],
      profils: ['', [ Validators.required]],
      image: ['', [ Validators.required]],
      confirm: ['', [ Validators.required, ]]
    });
    this.id = UserService.idUser;
    if (this.id){
      this.edit = true;
      this.user = this.userservice.getOneUser(this.id);
    }
    console.log(this.id);
  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formadd?.controls;
  }

  onFilSelected(event: any) {
    this.imageSelect = event.target.files[0];
  }


  addUser(){
     console.log(this.formadd.value);
     var formData = new FormData();
     formData.append('prenom', this.formadd.value.prenom);
     formData.append('nom', this.formadd.value.nom);
     formData.append('email', this.formadd.value.email);
     formData.append('password', this.formadd.value.password);
     formData.append('image', this.imageSelect);
     formData.append('profils', this.formadd.value.profils);
     this.userservice.addUser(formData).subscribe(
      (response: any) => {
        console.log(response);
        this.onClose();
        this.router?.navigate(['/users']);
      },
      error => {
        console.log(error);
        alert(error.error.detail);
      }
    );
  }
  onClose(){
    this.formadd.reset();
    this.dialogRef?.close();
  }

  updateUser(){

  }



}

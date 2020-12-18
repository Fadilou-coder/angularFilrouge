import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Profil } from 'src/app/Model/profil/profil';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-add-profils',
  templateUrl: './add-profils.component.html',
  styleUrls: ['./add-profils.component.scss']
})
export class AddProfilsComponent implements OnInit {
  formulaire!: FormGroup;
  libelle = '';
  edit = false;
  profil: any;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
    private url: ActivatedRoute,
    private dialogRef: MatDialogRef<AddProfilsComponent>
  ) { }

  ngOnInit(): void {

    this.id = UserService.idCourent;
    if (this.id){
      this.edit = true;
      this.userservice.getOneProfil(this.id).subscribe(
        (response: any) => {
          this.profil = response[0];
        },
        (error: any) => {
          console.log(error);
        }
      );
    }else{
      this.profil = new Profil(0, '');
    }

    this.formulaire = this.formBuilder.group({
      libelle: ['', [ Validators.required]]
    });

    this.id = this.url.snapshot.params.id;
    if (this.id){
      this.edit = true;
      this.userservice.getOneProfil(this.id).subscribe(
        (data: any) => {
          this.profil = data[0];
        }
        );
    }
    console.log(this.id);
  }
  get f(){
    return this.formulaire?.controls;
  }

  addprofil(){
    this.userservice.addprofil(this.formulaire.value).subscribe(
      (response: any) => {
        console.log(response);
        this.onClose();
        this.router.navigate(['/profils']);
      },
      error => {
        console.log(error);
        alert(error.error.detail);
      }
    );
  }
  onClose(){
    this.formulaire.reset();
    this.dialogRef?.close();
    window.location.reload();
  }

  updateProfil(){
    this.id = UserService.idCourent;
    this.userservice.putProfil(this.id, this.formulaire.value).subscribe(
      (response: any) => {
        console.log(response);
        this.onClose();
        this.router.navigate(['/profils']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


}

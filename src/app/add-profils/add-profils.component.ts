import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private url: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formulaire = this.formBuilder.group({
      libelle: ['', [ Validators.required]]
    });

    this.id = this.url.snapshot.params.id;
    if (this.id){
      this.edit = true;
      this.profil = this.userservice.getOneProfil(this.id);
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
        this.router.navigate(['/profils']);
      },
      error => {
        console.log(error);
        alert(error.error.detail);
      }
    );
  }

  updateProfil(){
    this.id = this.url.snapshot.params.id;
    this.userservice.putProfil(this.id, this.formulaire.value).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


}

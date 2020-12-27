import jwt_decode from 'jwt-decode';
import { TokenService } from './../Services/token.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import {UserService} from 'src/app/Services/user.service';
import { AddUsersComponent } from 'src/app/add-users/add-users.component';;

@Component({
  selector: 'app-apprenant',
  templateUrl: './apprenant.component.html',
  styleUrls: ['./apprenant.component.scss']
})
export class ApprenantComponent implements OnInit {



  constructor(
    private userservice: UserService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private url: ActivatedRoute,
    private tokenService: TokenService
    ) { }

  page = this.url.snapshot.params['id'];
  id: any;
  users: any;
  nbrPage: any;
  displayedColumns: string[] = ['nom', 'prenom', 'mail', 'profil', 'update', 'delete'];
  token = this.tokenService.getLocalStorageToken();
  decoded:any = '';

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.decoded = this.decoded.roles[0];
      console.log(this.decoded);
    }
    if (!this.page){
      this.page = 1;
    }
    console.log(this.page);
    this.userservice.findAllApprenant(this.page).subscribe(
      (response: any) => {
        console.log(response);
        this.users = response['hydra:member'];
        if(response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
        }
      ,
      (error: any) => {console.log(error)}
    );
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
    }

  }

  archiverUser(id: any){
      this.userservice.archiverUser(id).subscribe(
        (response: any) => {
          console.log(response);
          window.location.reload();
        },
        error => {
          console.log(error);
          alert(error.error.detail);
        }
      );
  }

  onCreate(){
    UserService.idCourent = 0;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddUsersComponent);
  }

  onEdit(id: any){
    this.userservice.getID(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddUsersComponent);
  }

  suivant(){
    this.page++;
    this.router.navigate(['/apprenants/' + this.page]);
   }
  precedent(){
    this.page--;
    this.router.navigate(['/apprenants/' + this.page]);
  }


}

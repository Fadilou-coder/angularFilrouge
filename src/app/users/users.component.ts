import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import {UserService} from 'src/app/Services/user.service';
import { AddUsersComponent } from 'src/app/add-users/add-users.component';
import { UserbyprofilComponent } from 'src/app/userbyprofil/userbyprofil.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
// tslint:disable-next-line: class-name
export class usersComponent implements OnInit {
  id: any;
  users: any;
  displayedColumns: string[] = ['nom', 'prenom', 'mail', 'profil', 'update', 'delete'];

  constructor(
    private userservice: UserService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private url: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.userservice.findAllUser(1).subscribe(
      (response: any) => {
        this.users = response;
        }
      ,
      (error: any) => {console.log(error)}
    );
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



}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import {UserService} from 'src/app/Services/user.service';
import { AddUsersComponent } from 'src/app/add-users/add-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
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
    this.id = this.url.snapshot.params['id'];
    if (this.id){
      this.userservice.getOneUser(this.id);
      console.log(this.id);
    }
    this.userservice.findAllUser().subscribe(
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
        },
        error => {
          console.log(error);
          alert(error.error.detail);
        }
      );
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddUsersComponent);
  }

  onEdit(id: any){
    this.router.navigate(['/users/' + id]);
    this.userservice.getID(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddUsersComponent);
  }


}

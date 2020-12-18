import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import {UserService} from 'src/app/Services/user.service';
import { AddUsersComponent } from 'src/app/add-users/add-users.component';

@Component({
  selector: 'app-userbyprofil',
  templateUrl: './userbyprofil.component.html',
  styleUrls: ['./userbyprofil.component.scss']
})
export class UserbyprofilComponent implements OnInit {

  id: any;
  users: any;
  profil: any;
  displayedColumns: string[] = ['nom', 'prenom', 'mail', 'profil'];

  constructor(
    private userservice: UserService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private url: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.id = UserService.idCourent;
    this.userservice.getOneProfil(this.id).subscribe((profil: any) => {
      this.profil = profil[0];

    });
    this.userservice.getUserByProfil(this.id).subscribe(
      (response: any) => {
        this.users = response;
        console.log(this.users);
        }
      ,
      (error: any) => {
        console.log(error);
      }
    );
  }

}

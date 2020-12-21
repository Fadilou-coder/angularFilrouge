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
  nbrPage: any = 1;
  page = this.url.snapshot.params['id'];
  constructor(
    private userservice: UserService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private url: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.id = UserService.idCourent;
    if (!this.page){
      this.page = 1;
    }
    this.userservice.getOneProfil(this.id).subscribe((profil: any) => {
      this.profil = profil['hydra:member'][0];
      console.log(this.profil);
      console.log(profil);
    });
    this.userservice.getUserByProfil(this.id, this.page).subscribe(
      (response: any) => {
        this.users = response['hydra:member'];
        if(response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
        console.log(this.users);
        console.log(response);
        }
      ,
      (error: any) => {
        console.log(error);
      }
    );
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
    }
  }

  suivant(){
    this.page++;
    this.router.navigate(['/usersbyprofils/' + this.page]);
  }

  precedent(){
    this.page--;
    this.router.navigate(['/usersbyprofils/' + this.page]);
  }

}

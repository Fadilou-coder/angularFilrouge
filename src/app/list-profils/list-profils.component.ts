import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/Services/user.service';
import { AddProfilsComponent } from 'src/app/add-profils/add-profils.component';
import { UserbyprofilComponent } from 'src/app/userbyprofil/userbyprofil.component';

@Component({
  selector: 'app-list-profils',
  templateUrl: './list-profils.component.html',
  styleUrls: ['./list-profils.component.scss']
})
export class ListProfilsComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private url: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    ) { }
  page = this.url.snapshot.params['id'];

  profils: any;
  displayedColumns: string[] = ['libelle', 'update', 'delete', 'details'];
  id: any;

  ngOnInit(): void {
    this.id = UserService.idCourent;
    console.log(this.page);
    if (!this.page){
      this.page = 1;
    }
    this.userservice.findAllProfil(this.page).subscribe(
      (response: any) => {
        this.profils = response;
        console.log(this.profils);
        }
      ,
      (error: any) => {
        console.log(error);
      }
    );
  }

  archiverProfil(id: any){
    this.userservice.archiverProfil(id).subscribe(
      (response: any) => {
        console.log(response);
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
        alert(error.error.detail);
      }
    );
  }

  editProfil(id: any){
    this.userservice.getID(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddProfilsComponent);
  }

  onCreate(){
    UserService.idCourent = 0;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddProfilsComponent);
  }


  details(id: any){
    this.userservice.getID(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(UserbyprofilComponent, { width: '100%' });
  }

  suivant(){
    this.page++;
    this.router.navigate(['/profils/' + this.page]);
  }

  precedent(){
    this.page--;
    this.router.navigate(['/profils/' + this.page]);
  }

}

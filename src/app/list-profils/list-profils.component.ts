import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-list-profils',
  templateUrl: './list-profils.component.html',
  styleUrls: ['./list-profils.component.scss']
})
export class ListProfilsComponent implements OnInit {

  profils:any;
  displayedColumns: string[] = ['libelle', 'update', 'delete'];
  id: any;
  constructor(
    private userservice: UserService,
    private url: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.userservice.getOneProfil(this.id);
    this.userservice.findAllProfil().subscribe(
      (response: any) => {
        this.profils = response;
        console.log(this.profils);
        }
      ,
      (error: any) => {console.log(error)}
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
    this.router.navigate(['/profils/' + id]);
  }

}

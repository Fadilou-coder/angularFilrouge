import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import {UserService} from 'src/app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class usersComponent implements OnInit {
  users:any
  displayedColumns: string[] = ['nom', 'prenom', 'mail','profil', 'update', 'delete'];
  constructor( private userservice: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userservice.findAllUser().subscribe(

      (response: any) => {this.users=response
      console.log(this.users)}
      ,
      (error: string) => console.log('Error '+ error)
      ,
      ()=>console.log('received data')
    )

  }
 /* avatar(image:any): SafeResourceUrl{
    image="data:image/png;base64,"+image;
    return this.sanitizer.bypassSecurityTrustHtml(image)
  }*/


}

import { Component } from '@angular/core';

import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public tokenService: TokenService) { }
  title = 'ProjetFilRouge';
  panelOpenState = false;
  token = localStorage.getItem('token');

  logout(): void{
    this.tokenService.removeLocalStorage();
  }
}

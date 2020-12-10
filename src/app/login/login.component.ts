import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import jwt_decode from 'jwt-decode';
import { TokenClass } from 'src/app/Model/token/token-class';
import { ConnexionService } from 'src/app/Services/connexion.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  submitted = false;
  formLogin: FormGroup | undefined;
  public token: TokenClass | undefined;
  // tslint:disable-next-line: max-line-length
  constructor(private connexion: ConnexionService, public tokenService: TokenService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [ Validators.required,Validators.email]],
      password: ['', [ Validators.required,Validators.minLength(6)]]
    });
  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formLogin?.controls;
  }

  DoLogin(): void{
    this.submitted = true;
    if (this.formLogin?.invalid) {
      return;
    }
    //traitement
    this.connexion.authenticate(this.email, this.password).subscribe((data: any) => {
      this.token = (data as TokenClass);
      this.tokenService.setLocalStorageToken(this.token);
      const token = this.tokenService.getLocalStorageToken();
      const decoded = jwt_decode(token.token);
      console.log(decoded);
      console.log(this.tokenService.getLocalStorageToken());
   }, (err: any) => console.log(err));
  }

}

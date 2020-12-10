import { Injectable } from '@angular/core';

import { TokenClass } from 'src/app/Model/token/token-class';



@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public setLocalStorageToken(auth: TokenClass): void{
    localStorage.setItem('Authorization', JSON.stringify(auth));
  }
  public getLocalStorageToken(): TokenClass{
    const tokenData = JSON.parse(localStorage.getItem('Authorization') as string);
    return tokenData == null ? null : tokenData;
  }
  public removeLocalStorage(): void{
    localStorage.removeItem('Authorization');
    localStorage.removeItem('usernom');
    localStorage.removeItem('userprenom');
    localStorage.removeItem('useremail');


  }
}

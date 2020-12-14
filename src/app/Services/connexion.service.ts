import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  /*public getUsers(){
    return this.http.get(this.apiUrl + '/users');
  }

  connexion(email?: string, password?: string){
    const Users = this.getUsers();
    //user = Users.find(u => u.email === email && u.password === password);
    return Users;
  }

  login(email: string, password: string){
    return this.http.post(this.apiUrl + '/users', {email, password});
  }*/

  // tslint:disable-next-line: typedef
  authenticate(email: string, password: string){
    return this.http.post(this.baseUrl + '/login', {
      email, password
   });
  }
}

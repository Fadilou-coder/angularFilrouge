import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/api';

  constructor( private http: HttpClient) { }


  findAllUser(){

    return this.http.get(this.baseUrl +'/admin/users')
  }

  findAllProfil(){
    return this.http.get(this.baseUrl +'/admin/profils}')
  }
}

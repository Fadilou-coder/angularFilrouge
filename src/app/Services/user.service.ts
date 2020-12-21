import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    ) { }
  static idCourent: number;
  private baseUrl = '/api';


  findAllUser(page: any){
    return this.http.get(this.baseUrl + '/admin/users?page=' + page);
  }

  findAllProfil(page: any){
    return this.http.get(this.baseUrl + '/admin/profils?page=' + page);
  }

  addprofil(data: any){
    return this.http.post(this.baseUrl + '/admin/profils',  data );
  }

  addUser(data: any){
    return this.http.post(this.baseUrl + '/admin/users',  data);
  }

  archiverUser(data: any){
    return this.http.delete(this.baseUrl + '/admin/users/' +  data);
  }

  archiverProfil(data: any){
    return this.http.delete(this.baseUrl + '/admin/profils/' +  data);
  }
  getOneProfil(data: any){
    return this.http.get(this.baseUrl + '/admin/profils/' + data);
  }
  getOneUser(data: any){
    return this.http.get(this.baseUrl + '/admin/users/' + data);
  }

  getUserByProfil(data: any, page: any){
    return this.http.get(this.baseUrl + '/admin/profils/' + data + '/users?page=' + page);
  }

  putProfil(id: any, body: any){
    return this.http.put(this.baseUrl + '/admin/profils/' + id, body);
  }

  putUser(id: any, body: any){
    return this.http.put(this.baseUrl + '/admin/users/' + id, body);
  }

  getID(id: any){
    UserService.idCourent = id;
  }

}

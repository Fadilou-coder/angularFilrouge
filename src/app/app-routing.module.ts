import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProfilsComponent } from 'src/app/add-profils/add-profils.component';
import { AddUsersComponent } from 'src/app/add-users/add-users.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ListProfilsComponent } from 'src/app/list-profils/list-profils.component';
import { LoginComponent } from 'src/app/login/login.component';
import { usersComponent } from 'src/app/users/users.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'users', component: usersComponent},
  { path: 'profils', component: ListProfilsComponent},
  { path: 'addprofil', component: AddProfilsComponent},
  { path: 'adduser', component: AddUsersComponent},
  { path: 'profils/:id', component: AddProfilsComponent},
  { path: 'users/:id', component: usersComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProfilsComponent } from 'src/app/add-profils/add-profils.component';
import { AddUsersComponent } from 'src/app/add-users/add-users.component';
import { LoginGuard } from 'src/app/guard/login.guard';
import { LogoutGuard } from 'src/app/guard/logout.guard';
import { ListProfilsComponent } from 'src/app/list-profils/list-profils.component';
import { LoginComponent } from 'src/app/login/login.component';
import { UserbyprofilComponent } from 'src/app/userbyprofil/userbyprofil.component';
import { usersComponent } from 'src/app/users/users.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard]},
  { path: 'users', component: usersComponent, canActivate: [LoginGuard]},
  { path: 'profils', component: ListProfilsComponent, canActivate: [LoginGuard]},
  { path: 'addprofil', component: AddProfilsComponent, canActivate: [LoginGuard]},
  { path: 'adduser', component: AddUsersComponent, canActivate: [LoginGuard]},
  { path: 'usersbyprofil', component: UserbyprofilComponent, canActivate: [LoginGuard]},
  { path: 'profils/:id', component: ListProfilsComponent, canActivate: [LoginGuard]},
  { path: 'users/:id', component: usersComponent, canActivate: [LoginGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

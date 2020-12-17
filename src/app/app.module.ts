import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginInterceptor } from 'src/app/Interceptor/login.interceptor';
import { AddProfilsComponent } from 'src/app/add-profils/add-profils.component';
import { AddUsersComponent } from 'src/app/add-users/add-users.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ListProfilsComponent } from 'src/app/list-profils/list-profils.component';
import { LoginComponent } from 'src/app/login/login.component';
import { usersComponent } from 'src/app/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    usersComponent,
    AddUsersComponent,
    ListProfilsComponent,
    AddProfilsComponent,
    usersComponent
  ],
  imports: [

  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AddUsersComponent]
})

export class AppModule { }

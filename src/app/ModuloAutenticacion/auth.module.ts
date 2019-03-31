import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SmartadminModule } from "../shared/smartadmin.module";
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { routing } from "./auth.routing";
import { AuthComponent } from './auth.component';
import { CarouselModule } from 'ngx-bootstrap';
import { ObservableService, AlertasService } from '../providers/';

import { AuthService } from './providers/auth.service';

import { UserService } from '../shared/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    CarouselModule,
    SmartadminModule
  ],
  declarations: [LoginComponent,  AuthComponent, ErrorComponent],
  providers: [UserService, ObservableService, AuthService, AlertasService]
})
export class AuthModule { }

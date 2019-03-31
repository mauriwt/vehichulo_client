import { Observable } from 'rxjs/Observable';
import {Component, OnInit} from '@angular/core';
import { AuthService } from "../providers/auth.service";
import { observeOn } from 'rxjs/operator/observeOn';

@Component({

  selector: 'fbg-login-info',
  templateUrl: 'login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  public user:any = {
    authorities: null,
    authenticated: true,
    dni: null,
    mail:null,
    username:null,
    uuid:null
  };

  constructor(
    private authService: AuthService) {}

  ngOnInit() {
    /*this.authService.getMeInfo((data) => {
      console.log(data);
      localStorage.setItem("username", data.username);
      this.user = data;
    });*/
  }



}


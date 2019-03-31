import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";

declare var $:any;

@Component({
  selector: 'sa-logout',
  template: `
<div id="logout" (click)="showPopup()" class="btn-header transparent pull-right">
        <span> <a routerlink="/auth/login" title="Sign Out" data-action="userLogout"
                  data-logout-msg="You can improve your security further after logging out by closing this opened browser"><i
          class="fa fa-sign-out"></i></a> </span>
    </div>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private userService:UserService) { }

  showPopup(){
    $.SmartMessageBox({
      title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content : "¿ Esta seguro de cerrar la sesión ?",
      buttons : '[CANCELAR][ACEPTAR]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "ACEPTAR") {
        this.logout()
      }
    });
  }

  logout(){
    this.userService.doLogout()
    .subscribe(data => this.router.navigate(['/auth/login']));
  }

  ngOnInit() {

  }



}

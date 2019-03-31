import { Component, OnInit } from '@angular/core';
import { AuthService } from "../providers/auth.service";

declare var $:any;

@Component({
  selector: 'fbg-logout',
  template: `
<div id="logout" (click)="showPopup()" class="btn-header transparent pull-right">
        <span> <a routerlink="/auth/login" title="Sign Out" data-action="userLogout"
                  data-logout-msg="Puedes mejorar la seguridad de tu salida cerrando el navegador."><i
          class="fa fa-sign-out"></i></a> </span>
    </div>
  `,
  styles: []
})
export class LogoutOauthComponent implements OnInit {

  constructor(private auth:AuthService) { }

  showPopup(){
    $.SmartMessageBox({
      title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content : "¿ Esta seguro de cerrar la sesión ?",
      buttons : '[CANCELAR][CERRAR SESIÓN APP][CERRAR YAUTH]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "CERRAR SESIÓN APP") {
        this.logout()
      }
      else if (ButtonPressed == "CERRAR YAUTH") {
        this.logoutFull();
      }
    });
  }

  public logout(){
    this.auth.doLogout();
  }

  public logoutFull(){
    this.auth.doLogoutFull();
  }

  ngOnInit() { }
}

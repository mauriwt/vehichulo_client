import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../providers/auth.service';
import { AlertasService } from '../../providers/alertas.service';
import { config } from '../../shared/smartadmin.config';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public app_name = config.app_long_name;
  public cargando: boolean;
  public usuario: string;
  public procesandoToken:boolean;

  public existToken:boolean;
  constructor(private authService: AuthService,
    private alertasService: AlertasService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.cargando = false;
    this.procesandoToken = false;
    this.existToken = this.authService.exixsToken() != null;
    this.usuario = localStorage.getItem("username");

    if(this.usuario)
      this.usuario = this.usuario.toUpperCase();
    else
      this.usuario = "DESCONOCIDO"

    this.activeRoute.params.subscribe(params => {
      if(params.access_token && params.refresh_token){
        this.procesandoToken = true;
        if(!this.authService.almacenarToken(params))
          this.alertasService.mostrarAlertaError("Error.", "Error de almacenamiento.", {});
        this.router.navigate([this.authService.MAIN_PAGE]);
      }
    });
  }

  doLogin() {
    this.authService.doLogin();
  } 

  doLogout() {
    this.authService.doLogout();
  } 
  
  doRefresh() {
    this.authService.refreshTokenBack()
    .subscribe(response => {
        this.router.navigate([this.authService.MAIN_PAGE]);
    });
  } 
}

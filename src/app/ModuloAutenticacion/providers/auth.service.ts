import { Observer } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { YfValidador } from '../models/index';
import { ObservableService } from '../../providers/observable.service';
import { config } from '../../shared/smartadmin.config';

@Injectable()
export class AuthService {

  private TOKEN = "uuid_sesion";
  private REFRESH_TOKEN = "uuid_sesion_nueva";
  private SCOPES = "SCP";
  private EXPIRES = "uuid_time";
  private TOKEN_TYPE = "Bearer";
  private USERNAME = "username";
  private PRE_REFRESH_TIME = 10000;
  public MAIN_PAGE = "/";
  private authorize_uri: string;
  private redirect_uri: string;
  private response_type = "code";

  private static permisos: string[];
  public static timerRefresh: any;
  public static tokenValidated:boolean;
  public user:any;


  constructor(private http: ObservableService) {
    console.log("Init auth services");
    if(!config.oauth.local){
      config.oauth.local = window.location.origin;
    }
    this.redirect_uri = encodeURIComponent(`${config.oauth.local}${config.oauth.redirect_uri}`);
    this.authorize_uri = `${config.oauth.remote}${config.oauth.authorize_uri}?response_type=${this.response_type}&client_id=${config.oauth.client_id}&redirect_uri=${this.redirect_uri}`;
    let scopes = localStorage.getItem(this.SCOPES);
    console.log(this.authorize_uri);
    AuthService.tokenValidated = false;
    if (scopes)
      AuthService.permisos = JSON.parse(scopes);
    else
      AuthService.permisos = [];

  }

  public getMeInfo(handler)
  {
    if(this.user)
      handler(this.user);
    else
      this.http.getUrlServicioGet(`${config.oauth.remote}${config.oauth.login_info}`)
      .subscribe(data => {
        handler(data);
      });
  }

  public doLogin() {
    location.href = this.authorize_uri;
  }

  public almacenarToken(credenciales) {
    if(!credenciales){
      clearInterval(AuthService.timerRefresh);
      localStorage.clear();
      window.location.href = window.location.href.split('#')[0];
      return;
    }
      
    let almadened = false;
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem(this.TOKEN, credenciales.access_token);
      localStorage.setItem(this.REFRESH_TOKEN, credenciales.refresh_token);
      AuthService.permisos = credenciales.scope ? credenciales.scope.split(' ') : [];
      
      localStorage.setItem(this.SCOPES, JSON.stringify(AuthService.permisos));
      let exp_date = parseInt(credenciales.expires_in) * 1000;
      exp_date += new Date().getTime();
      localStorage.setItem(this.EXPIRES, exp_date.toString());

      //Refresh
      let auth = this;
      let time = (exp_date - new Date().getTime()) - this.PRE_REFRESH_TIME;
      console.log("refresh en " + time);
      time = time ? time : 1;
      if (!AuthService.timerRefresh)
        AuthService.timerRefresh = setTimeout(() => {
          console.log("Refrescado automatico");
          AuthService.timerRefresh = null;
          auth.refreshTokenBack().subscribe();
        }, time);

      almadened = true;
    }
    this.setHeaders(credenciales.access_token);
    return almadened;
  }

  public doLogout() {
    this.http.getUrlServicioGet(`${config.oauth.remote}${config.oauth.logout_uri}`)
      .subscribe(response => {
        clearInterval(AuthService.timerRefresh);
        localStorage.clear();
        window.location.href = window.location.href.split('#')[0];
      }, err => {
        localStorage.clear();
        window.location.href = window.location.href.split('#')[0];
      });
  }

  public doLogoutFull() {
    this.http.getUrlServicioGet(`${config.oauth.remote}${config.oauth.logout_full_uri}`)
      .subscribe(response => {
        clearInterval(AuthService.timerRefresh);
        localStorage.clear();
        window.location.href = window.location.href.split('#')[0];
      },err => {
        localStorage.clear();
        window.location.href = window.location.href.split('#')[0];
      });
  }


  public verificarToken() {
    //Status: 1 Correcto
    //        -1 Storage Error
    //        -2 No hay data storage
    //        -3 Error de refresco, o de checkeo
    return new Observable<number>(observer => {
      console.log("Verificando credeniales.");

      if (typeof (Storage) !== "undefined") {
        let token = localStorage.getItem(this.TOKEN);
        let refresh_token = localStorage.getItem(this.REFRESH_TOKEN);
        let exp_date = parseInt(localStorage.getItem(this.EXPIRES));
        if (token && refresh_token) {
          console.log("TOKEN EXISTE.");
          if(new Date().getTime() + this.PRE_REFRESH_TIME > exp_date)
          {
            console.log("TOKEN POR CADUCAR REFRESCANDO");
            this.refreshTokenBack().subscribe(response => {
              observer.next(1);
            }, err => observer.next(-3));
          }else{
            this.setHeaders(token);
            this.checkRemoteToken()
              .subscribe(response => {
                console.log("TOKEN VALIDO");
                //Refresh
                let auth = this; 
                let time = (exp_date - new Date().getTime()) - this.PRE_REFRESH_TIME;
                time = time ? time : 1;
                console.log("refresh en " + time);
                if (!AuthService.timerRefresh)
                  AuthService.timerRefresh = setTimeout(() => {
                    console.log("Refrescado automatico");
                    AuthService.timerRefresh = null;
                    auth.refreshTokenBack().subscribe();
                  }, time);
                observer.next(1);
              }, err => {
                observer.next(-3);
              });
          }
        } else
          observer.next(-2);
      } else
        observer.next(-1);
    });
  }

  public checkExpired() {
    let time = localStorage.getItem(this.EXPIRES);
    if (time)
      return new Date().getTime() > parseInt(localStorage.getItem(this.EXPIRES));
    return false;
  }

  public hasScopes(scopes: string[]) {
    for (let i = 0; i < scopes.length; i++) {
      if (AuthService.permisos.indexOf(scopes[i]) == -1)
        return false;
    }
    return true;
  }
  
  public hasScopesOr(scopes: string[]) {
    for (let i = 0; i < scopes.length; i++) {
      if (AuthService.permisos.indexOf(scopes[i]) != -1)
        return true;
    }
    return false;
  }

  public exixsToken() {
    if (typeof (Storage) !== "undefined") {
      return localStorage.getItem(this.TOKEN);
    }
    return null;
  }

  public refreshTokenBack() {
    let refresh_token = localStorage.getItem(this.REFRESH_TOKEN);
    let token = localStorage.getItem(this.TOKEN);
    return this.http.getUrlServicioPost(`${config.oauth.local}${config.oauth.redirect_uri}`, { uuid_refresh_session: refresh_token, token: token })
      .map(params => {
        this.almacenarToken(params);
        return params;
      });
  }

  private checkRemoteToken() {
    return this.http.getUrlServicioGet(`${config.oauth.local}${config.oauth.check_uri}`);
  }

  private setHeaders(token) {
    this.http.setHeaders(`${this.TOKEN_TYPE} ${token}`);
  }

  private refreshToken(refresh_token, observer) {
    console.log("Refresing token");
    this.http.getUrlServicioPost(`${config.oauth.local}${config.oauth.redirect_uri}`, { uuid_refresh_session: refresh_token })
      .subscribe(params => {
        console.log(params);
        this.almacenarToken(params);
        observer.next(true);
      });
  }
}

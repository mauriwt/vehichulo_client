import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from "@angular/router";
import {Observable, Subject} from "rxjs/Rx";
import {UsuarioSistema} from './user.model';
import {config} from '../smartadmin.config';


@Injectable()
export class UserService {

  public user: UsuarioSistema;
  public  subjectUser:Subject<any>;
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http:Http, private router:Router) {
    this.subjectUser = new Subject();
  }

  public doLogin(usuario){
    return this.http.post(`${config.APIRest.url}${config.APIRest.autenticacion.login}`,
                    JSON.stringify(usuario), {headers: this.headers, withCredentials: true})
                    .map(response => {this.subjectUser.next(response);return response.json() as UsuarioSistema})
                    .catch(err => this.handleError(err, false))
  }
  public doLogout(){
    return this.http.post(`${config.APIRest.url}${config.APIRest.autenticacion.logout}`,
                    JSON.stringify({}), {headers: this.headers, withCredentials: true})
                    .map(response => {this.subjectUser.next({});return response})
                    .catch(err => this.handleError(err, false))
  }
  public getLogin(){
    if(!this.user || !this.user.usuarioID)
      return this.http.post(`${config.APIRest.url}${config.APIRest.autenticacion.sesion}`,
                    {}, {headers: this.headers, withCredentials: true})
                    .map(response => {return response.json() as UsuarioSistema})
                    .catch(err => this.handleError(err, true));
    else
      return Observable.of(this.user);
  }
  public getLoginNR(){
    if(!this.user)
      return this.http.post(`${config.APIRest.url}${config.APIRest.autenticacion.sesion}`,
                    JSON.stringify({}), {headers: this.headers, withCredentials: true})
                    .map(response => {return response.json() as UsuarioSistema})
                    .catch(err => this.handleError(err, false));
    else
      return Observable.of(this.user);
  }
  public getHeadersAuth() {
    let salida:any = {headers: Headers}; 
    if(this.user && this.user.usuarioID)
      salida.withCredentials = true;
    return salida;
  }

  private handleError(err, redirect){
    console.log(err);
    if(redirect)this.router.navigate(['/auth/login']);
    return Observable.throw("Error de autenticación.");
  }

}

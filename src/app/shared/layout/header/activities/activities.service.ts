import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { config } from '../../../smartadmin.config';


@Injectable()
export class ActivitiesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http : Http) {
  }

  getNotificacionesActivas(usuarioDNI:string) {
    return this.http.get(`${config.APIRest.url}${config.APIRest.notificacion.activas}/${usuarioDNI}`, { withCredentials: true })
            .map((response) => response.json());
  }
  getNotificacionesInactivas(usuarioDNI:string) {    
    return this.http.get(`${config.APIRest.url}${config.APIRest.notificacion.inactivas}/${usuarioDNI}`, { withCredentials: true })
            .map(response => response.json());
  }

  leerNotificacion(notificacionID:number)
  {
    return this.http.put(`${config.APIRest.url}${config.APIRest.notificacion.desactivar}/${notificacionID}`, {},
    { headers: this.headers, withCredentials: true })
          .map(response => response.json());
  }

  borrarNotificacion(notificacionID:number)
  {
    return this.http.delete(`${config.APIRest.url}${config.APIRest.notificacion.base}/${notificacionID}`, 
    { withCredentials: true })
          .map(response => response.json());
  }

}
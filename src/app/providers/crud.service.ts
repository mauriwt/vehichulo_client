import { Injectable } from '@angular/core';
import { ObservableService } from './observable.service';

@Injectable()
export class CRUDService {

  constructor(private servicio: ObservableService) { }

  public obtener(rest_url) {
    return this.servicio.getUrlServicioGet(rest_url);
  }

  public post(rest_url, object) {
    return this.servicio.getUrlServicioPost(rest_url, object);
  }

  public put(rest_url, object) {
    return this.servicio.getUrlServicioPut(rest_url, object);
  }

  public patch(rest_url) {
    return this.servicio.getUrlServicioPATCH(rest_url);
  }

  public save(rest_url, object, ruta) {
    if (ruta === "update"){
      return this.put(rest_url, object);}
    else
      return this.post(rest_url, object);
  }

}

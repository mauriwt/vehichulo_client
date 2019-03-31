import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { config } from 'app/shared/smartadmin.config';


@Injectable()
export class GenericoService {

  private base = config.APIRest.url;
  private formulario: FormGroup;
  private checkboxes: any;
  public storage: any;

  galon = 3.78541; // en litros

  constructor() { }

  public generar(campos) {
    this.formulario = new FormGroup({});
    for (let o of campos) {
      this.formulario.addControl(o.id, new FormControl('', o.validar));
    }
    return this.formulario;
  }

  openClose(modalID,accion) {
    $('#' + modalID).modal(accion);
  }

  litrosAgalon(litros:number){
    return (litros / this.galon).toFixed(2);
  }

  get _base() {
    return this.base;
  }
}

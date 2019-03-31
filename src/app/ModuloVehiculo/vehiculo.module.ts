import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { vehiculoRouting } from './vehiculo.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import {VehiculoComponent} from "./vehiculo.component";
import { CRUDService, FormService, GenericoService, AlertasService , ObservableService} from 'app/providers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    vehiculoRouting,
    SmartadminModule,
    FormsModule,
    ReactiveFormsModule,

  
  ],
  declarations: [VehiculoComponent ],
  providers: [CRUDService, FormService, AlertasService, GenericoService, ObservableService]
})
export class VehiculoModule { }

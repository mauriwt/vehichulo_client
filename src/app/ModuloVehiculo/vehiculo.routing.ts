import { Routes, RouterModule } from '@angular/router';
import {VehiculoComponent} from "./vehiculo.component";

export const vehiculoRoutes: Routes = [
    {
        path: '',
        component: VehiculoComponent,
        data: {
            pageTitle: 'Vehículos'
        }
    }
];

export const vehiculoRouting = RouterModule.forChild(vehiculoRoutes);


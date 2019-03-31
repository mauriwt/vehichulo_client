import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';
import { DatatableDirective } from './datatable.directive';

// require('smartadmin-plugins/bower_components/datatables.net-colreorder-bs/css/colReorder.bootstrap.min.css');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DatatableComponent, DatatableDirective],
  exports: [DatatableComponent, DatatableDirective],
})
export class SmartadminDatatableModule { }

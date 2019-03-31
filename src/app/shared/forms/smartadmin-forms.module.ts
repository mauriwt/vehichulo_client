

import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {CommonModule} from "@angular/common";
import {SmartadminInputModule} from "./input/smartadmin-input.module";
import {SmartadminValidationModule} from "./validation/smartadmin-validation.module";
import {DropzoneModule} from "./dropzone/dropzone.module";

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [
  ],
  exports: [

    SmartadminInputModule,
    SmartadminValidationModule,
    DropzoneModule,
  ]

})
export class SmartadminFormsModule{}

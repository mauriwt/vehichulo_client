import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {CommonModule} from "@angular/common";
import {Select2Module} from "./input/select2/select2.module";
import {OnOffSwitchModule} from "./input/on-off-switch/on-off-switch.module";
import {SmartadminValidationModule} from "./validation/smartadmin-validation.module";

import { SmartClockpickerDirective } from './input/smart-clockpicker.directive';
import { UiDatepickerDirective } from './input/ui-datepicker.directive';

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [SmartClockpickerDirective, UiDatepickerDirective
  ],
  exports: [
    Select2Module, OnOffSwitchModule, 
    SmartadminValidationModule, SmartClockpickerDirective, UiDatepickerDirective]
})
export class SmartadminFormsLiteModule{}

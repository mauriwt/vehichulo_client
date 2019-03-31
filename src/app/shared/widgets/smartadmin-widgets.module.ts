import {NgModule} from "@angular/core";
import {WidgetComponent} from "./widget/widget.component";
import { CalendarWidgetComponent } from  "./widget/calendar-widget.component";
import {WidgetsGridComponent} from "./widgets-grid/widgets-grid.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [WidgetComponent, WidgetsGridComponent, CalendarWidgetComponent],
  exports: [WidgetComponent, WidgetsGridComponent, CalendarWidgetComponent]
})
export class SmartadminWidgetsModule{}

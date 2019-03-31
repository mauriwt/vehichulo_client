

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {I18nModule} from "../../i18n/i18n.module";
import {BigBreadcrumbsComponent} from "./big-breadcrumbs.component";
import {MinifyMenuComponent} from "./minify-menu.component";
import {NavigationComponent} from "./navigation.component";
import {SmartMenuDirective} from "./smart-menu.directive";
import {UserModule} from "../../user/user.module";
import {RouterModule} from "@angular/router";
import { ScopeCheckDirective } from '../../../ModuloAutenticacion/scope-check.directive';
import { LoginInfoComponent } from '../../../ModuloAutenticacion/login-info/login-info.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UserModule
  ],
  declarations: [
    BigBreadcrumbsComponent,
    MinifyMenuComponent,
    NavigationComponent,
    SmartMenuDirective,
    LoginInfoComponent,
    ScopeCheckDirective
  ],
  exports: [
    BigBreadcrumbsComponent,
    MinifyMenuComponent,
    NavigationComponent,
    SmartMenuDirective,
    ScopeCheckDirective
  ]
})
export class NavigationModule{}

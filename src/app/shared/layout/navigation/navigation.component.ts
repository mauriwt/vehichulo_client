import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";
import { SmartMenuDirective } from './smart-menu.directive';
import { config } from '../../smartadmin.config';

@Component({

  selector: 'sa-navigation',
  templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {


  private menu:any[];
  public cargandoMenu:boolean;

  constructor() {
  }

  ngOnInit() {
  }


}

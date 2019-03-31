import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html'
})
export class Tab1Component implements OnInit {

  public tab:any;
  @Input() enteId:any;
  constructor() {
  }

  ngOnInit() {
    this.tab = "uno"   
  }
}

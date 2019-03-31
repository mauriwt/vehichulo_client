import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html'
})
export class Tab2Component implements OnInit {

  public tab:any;
  @Input() enteId:any;
  constructor() {
  }

  ngOnInit() {
    this.tab = "uno"   
  }
}

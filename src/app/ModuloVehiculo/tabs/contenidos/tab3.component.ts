import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html'
})
export class Tab3Component implements OnInit {

  public tab:any;
  @Input() enteId:any;
  constructor() {
  }

  ngOnInit() {
    this.tab = "uno"   
  }
}

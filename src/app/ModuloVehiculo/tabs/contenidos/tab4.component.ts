import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html'
})
export class Tab4Component implements OnInit {

  public tab:any;
  @Input() enteId:any;
  constructor() {
  }

  ngOnInit() {
    this.tab = "uno"   
  }
}

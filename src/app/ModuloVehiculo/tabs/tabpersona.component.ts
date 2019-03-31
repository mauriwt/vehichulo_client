import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tabpersona',
  templateUrl: './tabpersona.component.html'
})
export class TabPersonaComponent implements OnInit {

  public tab:any;
  @Input() enteId:any;
  constructor() {
  }

  ngOnInit() {
    this.tab = "uno"   
  }
}

import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
})
export class MsgComponent implements OnInit {
  @Input() condicion:any;
  @Input() msg:string;

  constructor() { }

  ngOnInit() {
   
  }

  
  
}

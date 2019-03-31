import {Directive, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[smartTimepicker]'
})
export class SmartTimepickerDirective implements OnInit{

  @Output() valueUpdated = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit(){
    System.import('script!bootstrap-timepicker/js/bootstrap-timepicker.min.js').then(()=>{
      this.render()
    })
  }


  render(){
    let update = this.valueUpdated;
    let element = $(this.el.nativeElement).timepicker(
      {
        format: 'HH:mm',
        change: (e) => console.log(e)
      });
  }
}

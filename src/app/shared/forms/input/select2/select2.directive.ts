import {Directive, ElementRef, AfterViewInit, Output, EventEmitter} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[select2]'
})
export class Select2Directive implements AfterViewInit{

  @Output() valueUpdated = new EventEmitter();
  constructor(private el: ElementRef) {

  }

  ngAfterViewInit(){
    System.import('script-loader!select2/dist/js/select2.min.js').then(()=>{
      let e = $(this.el.nativeElement);
      let event = this.valueUpdated;
      e.select2()
        .on('select2:select', () => event.emit(e.val()))
      ;
    })
  }

}

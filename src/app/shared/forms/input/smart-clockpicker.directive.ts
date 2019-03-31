import {Directive, ElementRef, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[smartClockpicker]'
})
export class SmartClockpickerDirective implements OnInit {

  @Input() smartClockpicker: any;
  @Input() icon: boolean;
  @Output() valueUpdated = new EventEmitter();

  constructor(private el:ElementRef) {
  }

  ngOnInit() {
    System.import('script-loader!clockpicker/dist/bootstrap-clockpicker.min.js').then(()=> {
      this.render()
    })
  }


  render() {
    let element = $(this.el.nativeElement);
    let event = this.valueUpdated;
    element.clockpicker(this.smartClockpicker || {
      placement: 'bottom',
      donetext: 'Aceptar',
      autoclose: true,
      afterDone: (e) => {event.emit(element.val());}
    });
    if(this.icon){
      element.next('span').click((e) => {
        e.stopPropagation();
        element.clockpicker('show');
      }
      );
    }
  }

}

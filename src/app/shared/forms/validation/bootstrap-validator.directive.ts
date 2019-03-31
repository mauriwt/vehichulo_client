import { Directive, Input, ElementRef, OnInit, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[saBootstrapValidator]'
})
export class BootstrapValidatorDirective implements OnInit {

  @Input() saBootstrapValidator: any;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  @HostListener('submit') s = () => {
    const bootstrapValidator = this.$form.data('bootstrapValidator');
    bootstrapValidator.validate();
    console.log(bootstrapValidator.validate());
    this.submitEvent.emit(bootstrapValidator.isValid());
    if (bootstrapValidator.isValid()) {
      console.log("Submit");
      //this.$form.submit();
      bootstrapValidator.resetForm();
    }

    else return false;
  }

  @HostListener('reset') reset = () => {
    const bootstrapValidator = this.$form.data('bootstrapValidator');
    bootstrapValidator.resetForm();
  }
  constructor(private el: ElementRef) {}

  ngOnInit() {
    System.import('script-loader!smartadmin-plugins/bower_components/bootstrapvalidator/dist/js/bootstrapValidator.min.js').then(() => {
      this.attach();
    })
  }

  private $form: any;


  private attach() {
    this.$form = $(this.el.nativeElement)
    this.$form.bootstrapValidator(this.saBootstrapValidator || {})
    console.log(this.saBootstrapValidator);
    
    this.$form.submit(function (ev) { ev.preventDefault(); });
  }

}

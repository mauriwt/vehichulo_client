import {Directive, Input, ElementRef, AfterViewInit, HostBinding, HostListener}  from '@angular/core';

declare var $: any;

@Directive({
  selector: '[fbg-datatable]'
})
export class DatatableDirective implements AfterViewInit {

  @Input() public options:any;
  @Input() public filter:any;
  @Input() public detailsFormat:any;

  @Input() public paginationLength: boolean;
  @Input() public columnsHide: boolean;
  @Input() public tableClass: string;
  @Input() public width: string = '100%';
  @Input() public pdf;
  @Input() public print;


  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(){
    this.execRender();
  }
  

  execRender()
  {
    Promise.all([
      System.import('script-loader!smartadmin-plugins/datatables/datatables.min.js')
    ]).then(()=>{
      this.render();
    })
  }

  render() {
    let element = $(this.el.nativeElement);
    let options = this.options || {};
    let buttons = [];

    if(this.pdf)
      buttons.push({
        text: 'PDF',
        extend: 'pdf',
        title: this.pdf,
        exportOptions: {columns: ':not(.acciones)'}
      });
    if(this.print)
      buttons.push({
        text: 'IMPRIMIR',
        extend: 'print',
        title: this.print,
        exportOptions: {columns: ':not(.acciones)'},
        customize: function(win){
          $(win.document.body).css('font-size', '20px');
          $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
          var medias = win.document.querySelectorAll('[media="screen"]');
          for(var i=0; i < medias.length;i++){ medias.item(i).media="all" };
        }
      });
    
    options.buttons = buttons;

    element.addClass(this.tableClass);

    let toolbar = '';
    if (options.buttons)
      toolbar += 'B';
    if (this.paginationLength)
      toolbar += 'l';
    if (this.columnsHide)
      toolbar += 'C';

    if (typeof options.ajax === 'string') {
      let url = options.ajax;
      options.ajax = {
        url: url,
      }
    }

    options = $.extend(options, {

      "dom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'" + toolbar + ">r>" +
      "t" +
      "<'dt-toolbar-footer'<'col-xs-12 col-sm-6'p><'col-sm-6 col-xs-12 hidden-xs'i>>",
      oLanguage: {
        "sSearch": "<span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span> ",
        "sLengthMenu": "_MENU_",
        "sZeroRecords": "No existen registros.",
        "sInfo": "Mostrando página _PAGE_ de _PAGES_",
        "sInfoEmpty": "No existen registros.",
        "sInfoFiltered": "(De _MAX_ registros.)",
        "sEmptyTable":     "No existen registros.",
        "sLoadingRecords": "Cargando datos ...",
        "sProcessing":     "Cargando datos ...",
        "oPaginate": {
            "sFirst":      "Primera",
            "sLast":       "Ultima",
            "sNext":       "<i class='fa fa-chevron-right'></i>",
            "sPrevious":   "<i class='fa fa-chevron-left'></i>"
        },
      },
      "autoWidth": false,
      retrieve: true,
      responsive: true,
      initComplete: (settings, json)=> {
        let e = element.parent();
        e.find('.input-sm', ).removeClass("input-sm").addClass('input-md');
        e.find('.dt-toolbar').css('background', 'transparent');
      }
    });
    const _dataTable = element.DataTable(options);

    element.removeClass("fade");

    if (this.filter) {
      // Apply the filter
      element.on('keyup change', 'thead th input[type=text]', function () {
        _dataTable
          .column($(this).parent().index() + ':visible')
          .search(this.value)
          .draw();

      });
    }


    if (!toolbar) {
      element.parent().find(".dt-toolbar").append('<div class="text-right"><img src="assets/img/logo.png" alt="SmartAdmin" style="width: 111px; margin-top: 3px; margin-right: 10px;"></div>');
    }

    if(this.detailsFormat){
      let format = this.detailsFormat
      element.on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = _dataTable.row( tr );
        if ( row.child.isShown() ) {
          row.child.hide();
          tr.removeClass('shown');
        }
        else {
          row.child( format(row.data()) ).show();
          tr.addClass('shown');
        }
      })
    }

  }

}

import {Component, OnInit, ElementRef, OnDestroy, Input} from '@angular/core';
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'calendar-widget',
  templateUrl: 'calendar-widget.component.html',
})
export class CalendarWidgetComponent implements OnDestroy {

  private $calendarRef: any;
  private calendar: any;

  @Input() titulo:string;
  @Input() desglosable:boolean;
  @Input() eventos:boolean;

  constructor(private el: ElementRef, private router:Router) {
    System.import('script-loader!smartadmin-plugins/bower_components/fullcalendar/dist/fullcalendar.js').then(()=> {
      System.import('script-loader!smartadmin-plugins/bower_components/fullcalendar/dist/lang/es.js').then(() => 
      {
        this.render()
      })
      
    })
  }


  render() {
    let events = this.eventos || [];
    console.log(events);
    let nav = this.router;
    this.$calendarRef = $('#calendar', this.el.nativeElement);
    this.calendar = this.$calendarRef.fullCalendar({
        lang: 'es',
        editable: true,
        selectable: false,
        selectHelper: true,
        unselectAuto: false,
        disableResizing: false,
        //events
        events: events,
        timeFormat: 'HH:mm',
        header: {
          left: 'title', //,today
          center: 'prev, next, today',
          right: 'Mensual, Semanal, Diario' //month, agendaDay,
        },

        select: (start, end, allDay) => {
          var title = prompt('Event Title:');
          if (title) {
            this.calendar.fullCalendar('renderEvent', {
                title: title,
                start: start,
                end: end,
                allDay: allDay
              }, true // make the event "stick"
            );
          }
          this.calendar.fullCalendar('unselect');
        },
        eventClick: function(calEvent, jsEvent, view) {
            nav.navigate(['/inspecciones', calEvent.objectID]);
        },
        eventRender: (event, element, icon) => {
          if (event.description != "") {
            element.find('.fc-event-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
          }
          if (event.icon != "") {
            element.find('.fc-event-title').append("<i class='air air-top-right fa " + event.icon + " '></i>");
          }
        }
      }
    );

    $('.fc-header-right, .fc-header-center', this.$calendarRef).hide();

    $('.fc-left', this.$calendarRef).addClass('fc-header-title')
  }

  ngOnDestroy() {
    this.calendar.fullCalendar('destroy')
  }

  public period = 'Mes'

  changeView(period) {
    this.calendar.fullCalendar('changeView', period);
    this.period = period
  }

  next() {
    $('.fc-next-button', this.el.nativeElement).click();
  }

  prev() {
    $('.fc-prev-button', this.el.nativeElement).click();
  }

  today() {
    $('.fc-today-button', this.el.nativeElement).click();
  }


}

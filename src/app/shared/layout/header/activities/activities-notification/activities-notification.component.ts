import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: '[activitiesNotification]',
  templateUrl: 'activities-notification.component.html',
})
export class ActivitiesNotificationComponent implements OnInit {

  @Input() item: any;
  @Input() icon: string;

  constructor() {}

  ngOnInit() {
  }
}

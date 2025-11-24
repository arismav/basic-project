import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/helpers/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class NotificationsComponent implements OnInit{
  notifications$ = this.notifService.getNotifications();

  constructor(private notifService: NotificationService) {}

  ngOnInit(): void {
    // console.log(this.notifService.getNotifications());
  }
}

import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  providers: [NotificationService],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  constructor(public readonly notificationService: NotificationService) {}
}
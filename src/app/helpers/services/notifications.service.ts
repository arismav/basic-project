import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationWebSocketService } from './notification-websocket.service';
import { WebSocketService } from './websocket.service';

export interface Notification {
    id: number;
    title: string;
    message: string;
    timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {

    private notifications$ = new BehaviorSubject<Notification[]>([]);

    constructor(private ws: NotificationWebSocketService) {
        this.ws.stream().subscribe(msg => {
            if (msg.type === "NOTIFICATION") {
                this.addNotification(msg.payload);
            }
        });
    }

    private addNotification(n: Notification) {
        const current = this.notifications$.getValue();
        this.notifications$.next([n, ...current]);
    }

    public getNotifications() {
        return this.notifications$.asObservable();
    }
}

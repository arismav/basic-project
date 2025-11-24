import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationWebSocketService {
  private socket!: WebSocket;
  private messages$ = new Subject<any>();

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket("ws://localhost:8080");

    this.socket.onmessage = (evt) => {
      this.messages$.next(JSON.parse(evt.data));
    };

    this.socket.onclose = () => {
      console.warn("WS closed — reconnecting");
      setTimeout(() => this.connect(), 2000);
    };
  }

  public stream(): Observable<any> {
    return this.messages$.asObservable();
  }
}

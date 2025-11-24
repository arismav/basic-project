import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket: WebSocket;
  private message$ = new Subject<any>();

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.message$.next(data);
    };
  }

  get messages$(): Observable<any> {
    return this.message$.asObservable();
  }
}

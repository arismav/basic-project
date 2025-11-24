import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebSocketService } from './websocket.service';

export interface GridItem {
  id: number;
  value: number;
}

@Injectable({ providedIn: 'root' })
export class GridService {
  private gridSubject = new BehaviorSubject<GridItem[]>([]);
  grid$ = this.gridSubject.asObservable();

  constructor(private ws: WebSocketService) {
    this.ws.messages$.subscribe(msg => {
      if (msg.type === 'GRID_UPDATE') {
        this.gridSubject.next(msg.payload);
      }
    });
  }
}

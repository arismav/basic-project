import { Component, effect, inject, signal } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { WebSocketService } from '../core/web-socket.service';
import type { ServerMessage } from '../core/ws.models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, DatePipe],

})

export class ChatComponent {
  ws = inject(WebSocketService);

  room = signal('general');
  text = signal('');
  feed = signal<Extract<ServerMessage, { type: 'chat' | 'system' }>[]>([]);

  constructor() {
    effect(() => {
      const r = this.room();
      const sub = this.ws.room$(r).subscribe((msg) =>
        this.feed.update((arr) => [...arr, msg])
      );
      return () => sub.unsubscribe();
    });
  }

  connect() { this.ws.connect(); }
  disconnect() { this.ws.disconnect(); }
  setRoom(v: string) { this.room.set(v); }
  join() { this.ws.send({ type: 'join', room: this.room() }); }

  send(ev: Event) {
    ev.preventDefault();
    const value = this.text().trim();
    if (!value) return;
    this.ws.send({ type: 'chat', room: this.room(), text: value });
    this.text.set('');
  }
}

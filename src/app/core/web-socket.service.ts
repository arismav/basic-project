import { Injectable, DestroyRef, inject, signal } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject, timer, delayWhen } from 'rxjs';
import { retryWhen, scan, delay, tap, filter } from 'rxjs/operators';
import type { ClientMessage, ServerMessage } from './ws.models';

function backoff(attempt: number, base = 500, cap = 10000) {
    const t = Math.min(cap, base * 2 ** attempt);
    return t + Math.floor(Math.random() * 250); // jitter
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {
    private socket$?: WebSocketSubject<ServerMessage | ClientMessage>;
    private outgoing$ = new Subject<ClientMessage>();

    readonly isConnected = signal(false);
    readonly lastPongTs = signal<number | null>(null);
    readonly messages$ = new Subject<ServerMessage>();

    private destroyRef = inject(DestroyRef);

    connect(url = 'ws://localhost:8080/ws', token = 'demo-token') {
        if (this.socket$) return; // avoid double-connect

        const socket = webSocket<ServerMessage | ClientMessage>({
            url: `${url}?token=${encodeURIComponent(token)}`,
            openObserver: { next: () => this.isConnected.set(true) },
            closeObserver: { next: () => { this.isConnected.set(false); this.socket$ = undefined; } },
            deserializer: (e) => JSON.parse(e.data),
            serializer: (v) => JSON.stringify(v),
        });

        const subOut = this.outgoing$.subscribe((m) => socket.next(m));

        const heartbeat = timer(0, 25000).subscribe(() => {
            if (this.isConnected()) this.send({ type: 'ping' });
        });

        const subIn = socket
            .pipe(
                retryWhen((errors) =>
                    errors.pipe(
                        scan((i) => i + 1, 0),
                        tap((i) => {
                            this.isConnected.set(false);
                            console.warn('WS reconnect', i);
                        }),
                        delayWhen((i) => timer(backoff(i))) // ✅ σωστό
                    )
                )
            )
            .subscribe({
                next: (msg) => {
                    const m = msg as ServerMessage;
                    if (!m || typeof (m as any).type !== 'string') return;
                    if (m.type === 'pong') this.lastPongTs.set(Date.now());
                    this.messages$.next(m);
                },
                error: (e) => console.error('WS error', e),
                complete: () => console.log('WS complete'),
            });

        this.socket$ = socket;
        this.send({ type: 'auth', token });

        this.destroyRef.onDestroy(() => {
            subOut.unsubscribe();
            subIn.unsubscribe();
            heartbeat.unsubscribe();
            socket.complete();
            this.socket$ = undefined;
        });
    }

    disconnect() {
        this.socket$?.complete();
        this.socket$ = undefined;
        this.isConnected.set(false);
    }

    send(msg: ClientMessage) {
        this.outgoing$.next(msg);
    }

    room$(room: string) {
        this.send({ type: 'join', room });
        return this.messages$.pipe(
            filter(
                (m): m is Extract<ServerMessage, { type: 'chat' | 'system' }> =>
                    m.type === 'chat' || m.type === 'system'
            ),
            filter((m: any) => !m.room || m.room === room)
        );
    }
}

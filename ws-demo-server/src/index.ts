import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { randomUUID } from 'crypto';
import type { ClientMessage, ServerMessage } from './types';

const server = http.createServer();
const wss = new WebSocketServer({ server, path: '/ws' });

// Χάρτες για clients και rooms
const rooms = new Map<string, Set<WebSocket>>();
const clients = new Map<WebSocket, { id: string; rooms: Set<string>; authed: boolean }>();

function joinRoom(ws: WebSocket, room: string) {
  if (!rooms.has(room)) rooms.set(room, new Set());
  rooms.get(room)!.add(ws);
  clients.get(ws)!.rooms.add(room);
}

function leaveRoom(ws: WebSocket, room: string) {
  rooms.get(room)?.delete(ws);
  clients.get(ws)!.rooms.delete(room);
}

function broadcast(room: string, msg: ServerMessage) {
  const set = rooms.get(room);
  if (!set) return;
  const payload = JSON.stringify(msg);
  for (const c of set) {
    if (c.readyState === WebSocket.OPEN) c.send(payload);
  }
}

wss.on('connection', (ws, req) => {
  const id = randomUUID();
  clients.set(ws, { id, rooms: new Set(), authed: false });

  // Στέλνουμε welcome μήνυμα
  ws.send(JSON.stringify({ type: 'welcome', clientId: id } satisfies ServerMessage));

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw.toString()) as ClientMessage;

      // --- Απλό auth με token ---
      if (msg.type === 'auth') {
        clients.get(ws)!.authed = msg.token === 'demo-token';
        if (!clients.get(ws)!.authed) {
          ws.send(JSON.stringify({ type: 'error', code: 'AUTH', message: 'Invalid token' }));
        }
        return;
      }

      // --- Αν δεν είναι authenticated ---
      if (!clients.get(ws)!.authed) {
        ws.send(JSON.stringify({ type: 'error', code: 'NOAUTH', message: 'Authenticate first' }));
        return;
      }

      // --- Routing των events ---
      switch (msg.type) {
        case 'ping':
          ws.send(JSON.stringify({ type: 'pong' } satisfies ServerMessage));
          break;

        case 'join':
          joinRoom(ws, msg.room);
          broadcast(msg.room, {
            type: 'system',
            text: `User ${id} joined ${msg.room}`,
            ts: Date.now(),
          });
          break;

        case 'leave':
          leaveRoom(ws, msg.room);
          broadcast(msg.room, {
            type: 'system',
            text: `User ${id} left ${msg.room}`,
            ts: Date.now(),
          });
          break;

        case 'chat':
          if (!clients.get(ws)!.rooms.has(msg.room)) {
            ws.send(JSON.stringify({ type: 'error', code: 'NOROOM', message: 'Join room first' }));
            return;
          }
          broadcast(msg.room, {
            type: 'chat',
            room: msg.room,
            from: id,
            text: msg.text,
            ts: Date.now(),
          });
          break;
      }
    } catch {
      ws.send(JSON.stringify({ type: 'error', code: 'BADMSG', message: 'Invalid JSON' }));
    }
  });

  // Ping ανά 30s για keep-alive
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) ws.ping();
  }, 30000);

  ws.on('close', () => {
    clearInterval(interval);
    const meta = clients.get(ws);
    if (!meta) return;
    for (const r of meta.rooms) rooms.get(r)?.delete(ws);
    clients.delete(ws);
  });
});

// Εκκίνηση server
server.listen(8080, () => {
  console.log('✅ WebSocket server running at ws://localhost:8080/ws');
});

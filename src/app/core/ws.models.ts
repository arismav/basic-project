export type ServerMessage =
  | { type: 'welcome'; clientId: string }
  | { type: 'error'; code: string; message: string }
  | { type: 'pong' }
  | { type: 'chat'; room: string; from: string; text: string; ts: number }
  | { type: 'system'; text: string; ts: number };

export type ClientMessage =
  | { type: 'ping' }
  | { type: 'join'; room: string }
  | { type: 'leave'; room: string }
  | { type: 'chat'; room: string; text: string }
  | { type: 'auth'; token: string };

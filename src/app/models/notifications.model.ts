// message-types.ts
export type WsMessageType =
  | 'NOTIFICATION'
  | 'ACK'
  | 'SYNC_REQUEST'
  | 'SYNC_RESPONSE';

export type NotificationSeverity = 'INFO' | 'WARNING' | 'ALERT' | 'CRITICAL' | 'SYSTEM';

export interface WsEnvelope<T = any> {
  type: WsMessageType;
  messageId?: string;
  correlationId?: string;
  payload: T;
}

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  severity: NotificationSeverity;
  timestamp: string;
  meta?: Record<string, any>;
}

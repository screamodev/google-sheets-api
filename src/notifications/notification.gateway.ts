import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  private server: Server;

  emitNewRow(row: any) {
    this.server.emit('newRow', row);
  }
}

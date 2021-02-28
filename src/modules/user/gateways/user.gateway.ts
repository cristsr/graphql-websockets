import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Request, UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { WsJwtAuthGuard } from 'modules/auth/guards/ws-auth.guard';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway()
export class UserGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('event')
  handleMessage(@MessageBody() data: any) {
    return {
      event: 'message',
      data: {
        success: true,
      },
    };
  }

  @SubscribeMessage('user')
  handleUser(client: any, payload: any, @Request() req): string {
    return payload;
  }
}

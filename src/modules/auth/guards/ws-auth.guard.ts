import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(host: ExecutionContext) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();
    const data = ctx.getData();
    const { authorization } = client.handshake.headers;
    client.headers = { authorization };
    return super.canActivate(new ExecutionContextHost([client, data]));
  }

  public handleRequest(
    err: any,
    user: any,
    info: any,
    host: ExecutionContext,
  ): any {
    if (user) {
      Logger.debug('User authorized', 'WsJwtAuthGuard');
      return user;
    }

    Logger.debug('User unauthorized', 'WsJwtAuthGuard');
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();
    client.emit('unauthorized');
    throw new WsException('unauthorized');
  }
}

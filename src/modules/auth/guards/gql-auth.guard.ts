import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from 'core/decorators/public';

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  public canActivate(host: ExecutionContext) {
    if (this.isPublic(host)) {
      Logger.debug('Public resource', 'GqlJwtAuthGuard');
      return true;
    }

    Logger.debug('Private resource', 'GqlJwtAuthGuard');

    const ctx = GqlExecutionContext.create(host);
    const { req } = ctx.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }

  private isPublic(host: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      host.getHandler(),
      host.getClass(),
    ]);
  }
}

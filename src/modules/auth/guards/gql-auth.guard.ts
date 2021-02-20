import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    // console.log(req);

    return super.canActivate(new ExecutionContextHost([req]));
  }

  // handleRequest(err: any, user: any) {
  //   if (err || !user) {
  //     throw err;
  //   }
  //   return user;
  // }
}

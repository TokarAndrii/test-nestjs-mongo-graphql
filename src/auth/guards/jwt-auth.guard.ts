import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth.module';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    if (!ctx.getContext().headers?.authorization) {
      return false;
    }

    const validateTokenResult = this.validateToken(
      ctx.getContext().headers?.authorization,
    );

    return validateTokenResult;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async validateToken(authorization: string) {
    const token = authorization.split('Bearer')[1];

    const decoded: any = jwt.verify(token.trim(), jwtConstants.secret);

    const { exp } = decoded;

    if (exp) {
      return new Date() > exp;
    } else {
      return false;
    }
  }
}

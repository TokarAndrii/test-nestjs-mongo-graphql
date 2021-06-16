import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './auth.module';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    //return super.canActivate(context);

    const ctx = GqlExecutionContext.create(context);

    if (!ctx.getContext().headers?.authorization) {
      return false;
    }

    const validateTokenResult = this.validateToken(
      ctx.getContext().headers?.authorization,
    );

    return validateTokenResult;
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

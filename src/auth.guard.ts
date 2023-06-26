import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UserRole } from './types/user-role';
import { catchError, firstValueFrom, of } from 'rxjs';
import { RequestPayload } from './types';

@Injectable()
export class RolesGuard implements CanActivate {
  public readonly logger = new Logger(RolesGuard.name);

  constructor(readonly roles: UserRole[] | '*') {}

  canActivate(context: ExecutionContext): boolean {
    const request: RequestPayload = context.switchToRpc().getData();

    if (!request.token) {
      throw new RpcException(new UnauthorizedException());
    }

    request.roles = this.roles;

    return true;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') public readonly authProxy: ClientProxy) {}

  public readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestPayload = context.switchToRpc().getData();

    const payload = { token: request.token, roles: request.roles };

    const observableResponse = this.authProxy.send('auth.verify', payload).pipe(catchError((error) => of(error)));
    const promiseResponse = await firstValueFrom(observableResponse);

    if (typeof promiseResponse === 'string') {
      request.userId = promiseResponse;
      return true;
    }

    this.logger.error(promiseResponse);
    throw new RpcException(promiseResponse);
  }
}

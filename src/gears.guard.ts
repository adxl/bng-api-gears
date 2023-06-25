import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { UserRole } from './types/user-role';
import { catchError, firstValueFrom, of } from 'rxjs';

type JWTRequest = {
  token: string;
  roles?: UserRole[] | '*';
};

@Injectable()
export class RolesGuard implements CanActivate {
  public readonly logger = new Logger(RolesGuard.name);

  constructor(readonly roles: UserRole[] | '*') {}

  canActivate(context: ExecutionContext): boolean {
    const request: JWTRequest = context.switchToHttp().getRequest();

    if (!request.token) {
      throw new RpcException(new UnauthorizedException());
    }

    request.roles = this.roles;

    return true;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) public readonly authProxy: ClientProxy) {}

  public readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: JWTRequest = context.switchToHttp().getRequest();

    const payload = { jwt: { token: request.token }, roles: request.roles };

    const observableResponse = this.authProxy.send('auth.verify', payload).pipe(catchError((error) => of(error)));
    const promiseResponse = await firstValueFrom(observableResponse);

    if (typeof promiseResponse === 'string') {
      return true;
    }

    this.logger.error(promiseResponse);
    throw new RpcException(promiseResponse);
  }
}

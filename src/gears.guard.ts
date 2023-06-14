import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { RequestToken } from './types/token';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { UserRole } from './types/user-role';
import { catchError, of } from 'rxjs';

export const AuthGuard = (roles: Array<UserRole | '*'>) => {
  @Injectable()
  class _AuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) public readonly authProxy: ClientProxy) {}

    public readonly logger = new Logger(AuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const jwt: RequestToken = context.switchToHttp().getRequest();
      const id: string | null = await this.verifyUser(jwt.token, roles);

      if (!id) return false;

      jwt.userId = id;

      return true;
    }

    verifyUser(token: string, roles: Array<UserRole | '*'>): any {
      return new Promise((resolve, reject) => {
        this.authProxy
          .send('auth.verify', {
            token,
            roles,
          })
          .pipe(catchError((error) => of(error)))
          .subscribe((value) => {
            if (typeof value !== 'string') reject('Access denied !');
            resolve(value);
          });
      }).catch((err) => this.logger.error(err));
    }
  }

  return _AuthGuard;
};

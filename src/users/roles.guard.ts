import {
  Injectable,
  CanActivate,
  Request,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './model/role.enum';
import { User } from './model/user.model';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => userRole.includes(role));
  }
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    console.log(requireRoles);
    const request = context.switchToHttp().getRequest();
    // console.log(Object.keys(request));
    // const user = {
    //   name: 'Nishant',
    //   roles: [Role.ADMIN],
    // };
    const user = request.user;
    console.log('canact', request.user);
    return this.matchRoles(requireRoles, user.roles);
  }
}

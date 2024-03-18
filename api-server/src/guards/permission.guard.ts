import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/user.entity';
import _ = require('lodash');

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const userPermissions = [];
    if (
      (request.user as any).is_super() ||
      _.difference(permissions, userPermissions).length === 0
    ) {
      return true;
    }

    throw new ForbiddenException('Không có quyền truy cập tài nguyên!');
  }
}

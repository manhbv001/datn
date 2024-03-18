import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import _ = require('lodash');

@Injectable()
export class ApiGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (request.headers['x-api-key'] !== process.env.API_KEY)
      throw new ForbiddenException('Không có quyền truy cập tài nguyên!');

    return true;
  }
}

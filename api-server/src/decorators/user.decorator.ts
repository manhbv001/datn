import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/user/user.entity';

export const GetUser = createParamDecorator(
  (key: string, context: ExecutionContext): User => {
    const request: Express.Request = context.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
  }
);

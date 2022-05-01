import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Cat } from 'src/cats/cats.schema';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

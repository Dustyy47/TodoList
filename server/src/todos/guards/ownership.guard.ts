import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id: userId } = request.user; // Предполагается, что вы установили пользователя во время аутентификации
    const ownerId = request.params.userId;

    const errorMessage =
      this.reflector.get<string>('guardError', context.getHandler()) ??
      'You must be an owner';
    if (userId !== ownerId) {
      throw new ForbiddenException(errorMessage);
    }

    return true;
  }
}

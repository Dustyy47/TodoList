import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FriendsService } from './../../friends/friends.service';

@Injectable()
export class FriendsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private friendsService: FriendsService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { id: userId } = request.user; // Предполагается, что вы установили пользователя во время аутентификации
    const ownerId = request.params.userId;

    if (userId !== ownerId) {
      const areFriends =
        (await this.friendsService.getFrienshipStatus(userId, ownerId)) ===
        'Friends';
      if (!areFriends) {
        const errorMessage =
          this.reflector.get<string>('guardError', context.getHandler()) ??
          'This user must be your friend or you';
        throw new ForbiddenException(errorMessage);
      }
    }

    return true;
  }
}

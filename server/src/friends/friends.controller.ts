import { Controller } from '@nestjs/common';
import {
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common/decorators';
import { User } from 'src/user/decorators';
import { JwtGuard } from 'src/user/guards';
import { StatusDTO } from './dto';
import { FriendsService } from './friends.service';

@Controller('friends')
@UseGuards(JwtGuard)
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post(':friendId')
  async createFriendRequest(
    @Param('friendId') receiverId,
    @User() { id: creatorId },
  ) {
    return await this.friendsService.createRequest({ receiverId, creatorId });
  }

  @Patch(':friendId')
  async changeRequestStatus(
    @Query() query: StatusDTO,
    @Param('friendId') creatorId,
    @User() { id: userId },
  ) {
    return await this.friendsService.changeRequestStatus({
      creatorId,
      userId,
      status: query.status,
    });
  }

  @Get('requests')
  async getFriendRequests(@Query() query: StatusDTO, @User() { id: userId }) {
    return await this.friendsService.getRequests({
      userId,
      status: query.status,
    });
  }

  @Get('')
  async getFriends(@User() { id }) {
    return await this.friendsService.getFriends(id);
  }
}

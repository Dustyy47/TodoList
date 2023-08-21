import { FriendRequestStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateFriendRequestDTO {
  @IsNotEmpty()
  creatorId: string;
  @IsNotEmpty()
  receiverId: string;
}
export class ChangeFriendRequestStatusDTO {
  @IsNotEmpty()
  creatorId: string;
  @IsNotEmpty()
  userId: string;
  @IsEnum(FriendRequestStatus)
  @IsNotEmpty()
  status: FriendRequestStatus;
}

export class StatusDTO {
  @IsEnum(FriendRequestStatus)
  @IsNotEmpty()
  status: FriendRequestStatus;
}

export class GetFriendRequestsDTO {
  @IsNotEmpty()
  userId: string;
  @IsEnum(FriendRequestStatus)
  @IsNotEmpty()
  status: FriendRequestStatus;
}

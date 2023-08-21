import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ChangeFriendRequestStatusDTO,
  CreateFriendRequestDTO,
  GetFriendRequestsDTO,
} from './dto';
import { FriendshipStatus } from './types/Friendship';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async createRequest(dto: CreateFriendRequestDTO) {
    try {
      if (dto.creatorId === dto.receiverId)
        throw new BadRequestException('Creator cant be equal Receiver');
      return await this.prisma.friendRequest.create({
        data: {
          creatorId: dto.creatorId,
          receiverId: dto.receiverId,
        },
      });
    } catch (e) {
      console.log(e);
      if (e.code === 'P2002') {
        throw new BadRequestException('This request is already exists');
      }
      return { status: 'error', error: e };
    }
  }

  async changeRequestStatus(dto: ChangeFriendRequestStatusDTO) {
    try {
      if (dto.status === 'DECLINED') {
        await this.prisma.friendRequest.deleteMany({
          where: {
            OR: [
              {
                AND: [{ creatorId: dto.creatorId }, { receiverId: dto.userId }],
              },
              {
                AND: [{ creatorId: dto.userId }, { receiverId: dto.creatorId }],
              },
            ],
          },
        });
        return { status: 'success' };
      }

      await this.prisma.friendRequest.updateMany({
        where: {
          OR: [
            {
              AND: [{ creatorId: dto.creatorId }, { receiverId: dto.userId }],
            },
            {
              AND: [{ creatorId: dto.userId }, { receiverId: dto.creatorId }],
            },
          ],
        },
        data: { status: dto.status },
      });
      return { status: 'success' };
    } catch (e) {
      console.log(e);
      if (e.code === 'P2025') {
        throw new NotFoundException('There is no request from provided user');
      }
      return { status: 'error', error: e };
    }
  }

  async getRequests(dto: GetFriendRequestsDTO) {
    // const createdRequests = await this.prisma.friendRequest.findMany({
    //   where: {
    //     creatorId: dto.userId,
    //     status: dto.status,
    //   },
    //   select: {
    //     status: true,
    //     receiverId: true,
    //     creatorId: true,
    //     creator: {
    //       select: {
    //         id: true,
    //         fullname: true,
    //       },
    //     },
    //   },
    // });
    const receivedRequests = await this.prisma.friendRequest.findMany({
      where: {
        receiverId: dto.userId,
        status: dto.status,
      },
      select: {
        status: true,
        receiverId: true,
        creatorId: true,
        creator: {
          select: {
            id: true,
            fullname: true,
          },
        },
      },
    });
    return receivedRequests;
    // const result = [...createdRequests, ...receivedRequests];

    // // TODO Optimize! (This code removes duplicates where receiverId equals creatorId)

    // const seenPairs = new Set();
    // return result.filter((obj) => {
    //   const pair1 = `${obj.creatorId}-${obj.receiverId}`;
    //   const pair2 = `${obj.receiverId}-${obj.creatorId}`;

    //   if (seenPairs.has(pair1) || seenPairs.has(pair2)) {
    //     return false;
    //   } else {
    //     seenPairs.add(pair1);
    //     return true;
    //   }
    // });
  }

  async getFrienshipStatus(activeUser, targetUser): Promise<FriendshipStatus> {
    try {
      const friendRequest = await this.prisma.friendRequest.findFirst({
        where: {
          OR: [
            {
              AND: [{ creatorId: activeUser }, { receiverId: targetUser }],
            },
            {
              AND: [{ creatorId: targetUser }, { receiverId: activeUser }],
            },
          ],
        },
      });
      if (friendRequest.creatorId === activeUser) {
        if (friendRequest.status === 'ACCEPTED') return 'Friends';
        else return 'ActiveUserSubscribed';
      } else if (friendRequest.creatorId === targetUser) {
        if (friendRequest.status === 'ACCEPTED') return 'Friends';
        else return 'TargetUserSubscribed';
      }
      return 'Strangers';
    } catch (e) {
      console.log(e);
      return 'Strangers';
    }
  }

  async getFriends(activeUserId: string) {
    try {
      return await this.prisma.user.findMany({
        where: {
          id: {
            not: {
              equals: activeUserId,
            },
          },
          OR: [
            {
              createdFriendRequests: {
                some: {
                  OR: [
                    {
                      creatorId: activeUserId,
                      status: 'ACCEPTED',
                    },
                    {
                      receiverId: activeUserId,
                      status: 'ACCEPTED',
                    },
                  ],
                },
              },
            },
            {
              receivedFriendRequests: {
                some: {
                  OR: [
                    {
                      creatorId: activeUserId,
                      status: 'ACCEPTED',
                    },
                    {
                      receiverId: activeUserId,
                      status: 'ACCEPTED',
                    },
                  ],
                },
              },
            },
          ],
        },
        distinct: 'id',
        select: {
          id: true,
          fullname: true,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

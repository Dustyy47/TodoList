import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FriendsService } from 'src/friends/friends.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersDTO, SignInDTO, SignUpDTO, UpdateUserDTO } from './dto';
import { JwtPayload } from './types/JwtPayload';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private friendsService: FriendsService,
    private jwt: JwtService,
  ) {}

  async signUp(dto: SignUpDTO) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          id: dto.id,
          password: hashedPassword,
          fullname: dto.fullname,
        },
      });

      return this.signToken({
        id: user.id,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ConflictException('Данный логин занят');
      }
      throw e;
    }
  }

  async signToken(payload: JwtPayload): Promise<{ access_token: string }> {
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  async signIn(dto: SignInDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: dto.id,
        },
      });
      if (!user) throw new ForbiddenException('Credentials incorrect');

      const pwMatches = await bcrypt.compare(dto.password, user.password);
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
      return this.signToken({
        id: user.id,
      });
    } catch (e) {
      console.log(e);
      if (e.status === 403) {
        throw new BadRequestException('Неверный логин или пароль');
      }
      return e;
    }
  }

  async getMe(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: id } });
      delete user.password;
      return user;
    } catch (e) {
      console.log(e);
      return { error: e, status: 'error' };
    }
  }

  async getUser(id: string, activeUserId: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: id } });
      delete user.password;
      const friendStatus = await this.friendsService.getFrienshipStatus(
        activeUserId,
        id,
      );

      return { ...user, friendStatus };
    } catch (e) {
      console.log(e);
      return { error: e, status: 'error' };
    }
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id: id } });
      return { status: 'success' };
    } catch (e) {
      console.log(e);
      return { error: e, status: 'error' };
    }
  }

  async updateUser(dto: UpdateUserDTO) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: dto.id,
        },
        data: {
          fullname: dto.fullname,
        },
      });
      delete user.password;
      return user;
    } catch (e) {
      console.log(e);
      return { error: e, status: 'error' };
    }
  }

  async getUsers(dto: GetUsersDTO) {
    const limit = dto.limit === undefined ? 5 : dto.limit;
    try {
      const foundedUsers = await this.prisma.user.findMany({
        where: {
          id: {
            contains: dto.searchId,
          },
        },
        take: limit,
      });

      const result = [];

      for (const foundedUser of foundedUsers) {
        const friendStatus = await this.friendsService.getFrienshipStatus(
          dto.userId,
          foundedUser.id,
        );
        result.push({
          id: foundedUser.id,
          fullname: foundedUser.fullname,
          friendStatus,
        });
      }
      return result;
    } catch (e) {
      console.log(e);
      return { error: e, status: 'error' };
    }
  }
}

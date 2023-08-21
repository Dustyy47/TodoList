import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FriendsService } from 'src/friends/friends.service';
import { JwtStrategy } from './strategies';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [UserService, JwtStrategy, FriendsService],
  controllers: [UserController],
})
export class UserModule {}

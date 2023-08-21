import { Module } from '@nestjs/common';
import { FriendsService } from 'src/friends/friends.service';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, FriendsService],
})
export class TodosModule {}

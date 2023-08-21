import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from 'src/friends/friends.service';
import { JwtGuard } from 'src/user/guards';
import { User } from './../user/decorators/user.decorator';
import { ErrorMessage } from './decorators';
import { CreateTodoDTO, CreateTodoListDTO, UpdateTodoDTO } from './dto';
import { FriendsGuard } from './guards/friends.guard';
import { OwnershipGuard } from './guards/ownership.guard';
import { TodosService } from './todos.service';

@UseGuards(JwtGuard)
@Controller(':userId/lists')
export class TodosController {
  constructor(
    private todosService: TodosService,
    private friendsService: FriendsService,
  ) {}

  @Post('')
  async createTodoList(
    @Body() dto: Omit<CreateTodoListDTO, 'authorId'>,
    @User() { id: authorId },
  ) {
    return await this.todosService.createTodoList({ ...dto, authorId });
  }

  @UseGuards(FriendsGuard)
  @Get('')
  async getTodoLists(@Param() { userId: authorId }) {
    return await this.todosService.getTodoLists({ authorId });
  }

  @ErrorMessage('You cant delete other user list')
  @UseGuards(OwnershipGuard)
  @Delete(':listId')
  async deleteTodoList(@Param('listId') listId) {
    return await this.todosService.deleteTodoList({ listId: +listId });
  }

  @UseGuards(FriendsGuard)
  @Get(':listId')
  async getTodos(@Param('listId') originalListId) {
    return await this.todosService.getTodos({
      originalListId: +originalListId,
    });
  }

  @ErrorMessage('You cant create todo in other user list')
  @UseGuards(OwnershipGuard)
  @Post(':listId')
  async createTodo(
    @Param('listId') originalListId,
    @Body() dto: Omit<CreateTodoDTO, 'originalListId'>,
  ) {
    return await this.todosService.createTodo({
      originalListId: +originalListId,
      ...dto,
    });
  }

  @ErrorMessage('You cant update todo that is not in your list')
  @UseGuards(OwnershipGuard)
  @Patch(':listId/:todoId')
  async updateTodo(
    @Param('todoId') todoId,
    @Body() dto: Omit<UpdateTodoDTO, 'id'>,
  ) {
    return await this.todosService.updateTodo({ ...dto, id: +todoId });
  }

  @ErrorMessage('You cant delete todo that is not in your list')
  @UseGuards(OwnershipGuard)
  @Delete(':listId/:todoId')
  async deleteTodo(@Param('todoId') todoId) {
    return await this.todosService.deleteTodo({ id: +todoId });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateTodoDTO,
  CreateTodoListDTO,
  DeleteTodoListDTO,
  GetTodoLists,
} from './dto';
import { DeleteTodoDTO, GetTodosDTO, UpdateTodoDTO } from './dto/todos.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async createTodoList(dto: CreateTodoListDTO) {
    try {
      const newList = await this.prisma.todoList.create({
        data: {
          authorId: dto.authorId,
          title: dto.title,
        },
      });
      return newList;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getTodoLists(dto: GetTodoLists) {
    try {
      const lists = await this.prisma.todoList.findMany({
        where: {
          authorId: dto.authorId,
        },
      });
      return lists;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getTodos(dto: GetTodosDTO) {
    try {
      const todos = await this.prisma.todo.findMany({
        where: {
          originalListId: dto.originalListId,
        },
      });
      const originalList = await this.prisma.todoList.findUnique({
        where: {
          id: dto.originalListId,
        },
      });
      return { todos, originalList };
    } catch (e) {
      console.log(e);
      return { status: 'error', error: e };
    }
  }

  async deleteTodoList(dto: DeleteTodoListDTO) {
    try {
      await this.prisma.todoList.delete({
        where: {
          id: dto.listId,
        },
      });
      return { status: 'success' };
    } catch (e) {
      console.log(e);
      return { status: 'error', error: e };
    }
  }

  async createTodo(dto: CreateTodoDTO) {
    try {
      const originalList = await this.prisma.todoList.findUnique({
        where: { id: dto.originalListId },
      });
      if (!originalList) {
        throw new BadRequestException('There are no lists with provided id');
      }
      return await this.prisma.todo.create({
        data: {
          isCompleted: false,
          text: dto.text,
          title: dto.title,
          originalListId: dto.originalListId,
        },
      });
    } catch (e) {
      console.log(e);
      return { status: 'error', error: e };
    }
  }

  async updateTodo(dto: UpdateTodoDTO) {
    try {
      return await this.prisma.todo.update({
        where: {
          id: dto.id,
        },
        data: {
          isCompleted: dto.isCompleted,
          title: dto.title,
          text: dto.text,
        },
      });
    } catch (e) {
      console.log(e);
      return { status: 'error', error: e };
    }
  }

  async deleteTodo(dto: DeleteTodoDTO) {
    try {
      await this.prisma.todo.delete({
        where: {
          id: dto.id,
        },
      });
      return { status: 'success' };
    } catch (e) {
      console.log(e);
      return { status: 'error', error: e };
    }
  }
}

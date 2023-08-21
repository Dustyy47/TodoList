import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoListDTO {
  @IsNotEmpty()
  authorId: string;
  @IsNotEmpty()
  title: string;
}

export class GetTodoLists {
  @IsNotEmpty()
  authorId: string;
}

export class DeleteTodoListDTO {
  @IsNotEmpty()
  listId: number;
}

export class EditTodoListDTO {
  @IsOptional()
  title?: string;
}

export class CreateTodoDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  text: string;
  @IsNotEmpty()
  originalListId: number;
}

export class UpdateTodoDTO {
  @IsNotEmpty()
  id: number;
  @IsOptional()
  title: string;
  @IsOptional()
  text: string;
  @IsOptional()
  isCompleted: boolean;
}

export class GetTodosDTO {
  @IsNotEmpty()
  originalListId: number;
}

export class DeleteTodoDTO {
  @IsNotEmpty()
  id: number;
}

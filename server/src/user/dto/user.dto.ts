import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  fullname: string;
}

export class SearchQueryDTO {
  @IsNotEmpty()
  searchId: string;
  @IsOptional()
  limit?: number;
}

export class GetUsersDTO extends SearchQueryDTO {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  searchId: string;
  @IsOptional()
  limit?: number;
}

import { IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  fullname: string;
}

export class SignInDTO {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  password: string;
}

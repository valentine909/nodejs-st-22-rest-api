import { IsNotEmpty } from '@nestjs/class-validator';

export class LoginDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}

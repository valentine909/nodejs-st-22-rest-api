import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { IsUnique } from '../validators/unique-login.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsUnique()
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[a-zA-Z]+/, { message: 'password must contain letters' })
  @Matches(/\d+/, { message: 'password must contain numbers' })
  password: string;

  @IsInt()
  @Min(4)
  @Max(130)
  age: number;
}

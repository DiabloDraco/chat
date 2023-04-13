import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  MinLength,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Role } from 'src/commons/role/entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  login: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  roles: Role[];
}

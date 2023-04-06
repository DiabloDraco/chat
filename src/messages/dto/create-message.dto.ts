import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/commons/user/entities/user.entity';
export class CreateMessageDto {
  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  userTo: number;
}

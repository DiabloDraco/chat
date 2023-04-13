import { IsNotEmpty, Min } from 'class-validator';

export class CreateRoleDto {
  name: string;

  @IsNotEmpty()
  readonly description: string;
}

import { IsNotEmpty, Min } from 'class-validator';

export class CreateRoleDto {
  @Min(1)
  readonly id: number;

  name: string;

  @IsNotEmpty()
  readonly description: string;
}

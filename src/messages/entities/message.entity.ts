import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../commons/entities/BaseEntity';
import { User } from 'src/commons/user/entities/user.entity';
import { Auth } from 'src/commons/decorators/auth.decorator';

@Entity('message')
export class Message extends BaseEntity {
  @Column()
  user: number;

  @Column({ nullable: false })
  message: string;

  @Column({ name: 'user_to' })
  userTo: number;
}

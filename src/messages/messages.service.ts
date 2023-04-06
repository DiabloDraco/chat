import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../commons/user/entities/user.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async onConnect(userId: number, id: string) {
    try {
      return await this.usersRepository.update(
        { id: userId },
        { socketId: id },
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async message(createMessageDto: CreateMessageDto) {
    try {
      let message = this.messageRepository.create(createMessageDto);

      return await this.messageRepository.save(message);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getOne(id: number) {
    try {
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

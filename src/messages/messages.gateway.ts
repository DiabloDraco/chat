import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: any, ...args: any[]) {
    let { token } = client.handshake.auth;
    await this.messagesService.onConnect(parseInt(token), client.id);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() body: CreateMessageDto,
    @ConnectedSocket() client: any,
  ) {
    let user = await this.messagesService.getOne(+body.userTo);

    this.server
      .to(user.socketId)
      .emit('new-message', { message: body.message });

    body.userTo = user.id;
    body.user = Number(client.handshake.auth.token);
    this.messagesService.message(body);
  }

  @SubscribeMessage('send-all')
  async handleAll(
    @MessageBody() body: CreateMessageDto,
    @ConnectedSocket() client: any,
  ) {
    console.log(body);

    this.server.emit('new-message', { message: body.message });
  }

  handleDisconnect(client: any): any {
    console.log(client.id);
  }
}

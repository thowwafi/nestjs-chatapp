import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessagesService } from './messages.service';
import { Message } from './messages.schema';
import { SocketGateway } from '../socket/socket.gateway';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Messaging')
@Controller('api')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly socketGateway: SocketGateway
) {}

  @UseGuards(JwtAuthGuard)
  @Get('view-messages')
  async viewMessages(@Request() req): Promise<Message[]> {
    const userId = req.user.userId;
    return this.messagesService.getMessages(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send-message')
  async sendMessage(@Request() req, @Body() messageData: { receiverId: string; content: string }): Promise<Message> {
    const senderId = req.user.userId;
    const { receiverId, content } = messageData;
    const newMessage = this.messagesService.createMessage(senderId, receiverId, content);
    this.socketGateway.server.to(receiverId).emit('newMessage', newMessage);

    return newMessage

  }
}

import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessagesService } from './messages.service';
import { Message } from './messages.schema';

@Controller('api')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('viewMessages')
  async viewMessages(@Request() req): Promise<Message[]> {
    const userId = req.user.userId;
    return this.messagesService.getMessages(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  async sendMessage(@Request() req, @Body() messageData: { receiverId: string; content: string }): Promise<Message> {
    const senderId = req.user.userId;
    const { receiverId, content } = messageData;
    return this.messagesService.createMessage(senderId, receiverId, content);
  }
}

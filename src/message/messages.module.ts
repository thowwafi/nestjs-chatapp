// messages.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from './messages.schema';
import { MessageProcessor } from './messages.processor';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    BullModule.registerQueue({ name: 'message-queue' }),
    SocketModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessageProcessor],
})
export class MessagesModule {}

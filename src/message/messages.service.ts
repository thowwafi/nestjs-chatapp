// messages.service.ts

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './messages.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) {}

  async createMessage(senderId: string, receiverId: string, content: string): Promise<Message> {
    const newMessage = new this.messageModel({ senderId, receiverId, content });
    return newMessage.save();
  }

  async getMessages(userId: string): Promise<Message[]> {
    return this.messageModel.find({ $or: [{ senderId: userId }, { receiverId: userId }] }).exec();
  }
}

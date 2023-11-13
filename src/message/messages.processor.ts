// message.processor.ts

import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';

@Processor('message-queue')
@Injectable()
export class MessageProcessor {
  @Process('sendMessage')
  async handleSendJob(job: Job<{ receiverId: string; content: string }>): Promise<void> {
    // Handle the job, e.g., send a notification to the user
    const { receiverId, content } = job.data;
    console.log(`Sending a message to user ${receiverId}: ${content}`);
  }
}

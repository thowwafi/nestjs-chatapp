import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User, UserSchema } from './users/users.entity';
import { MessagesModule } from './message/messages.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BullModule.registerQueueAsync({
      name: 'chat-queue',
      useFactory: () => ({
        redis: {
          host: process.env.RABBITMQ_URI,
        },
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MessagesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

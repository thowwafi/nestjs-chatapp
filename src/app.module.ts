import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User, UserSchema } from './users/users.entity';
import { Profile, ProfileSchema } from './profiles/profiles.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { MessagesModule } from './message/messages.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
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
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

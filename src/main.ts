import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const socketApp = await NestFactory.create(SocketModule);
  socketApp.enableCors();

  await app.listen(3000);
  await socketApp.listen(4000);
}
bootstrap();

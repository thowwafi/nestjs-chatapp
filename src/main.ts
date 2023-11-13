import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const socketApp = await NestFactory.create(SocketModule);
  socketApp.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Your Chat App')
    .setDescription('API documentation for your chat application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  await socketApp.listen(4000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SocketIoAdapter } from 'core/adapters/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  await app.listen(AppModule.port);

  Logger.log(`App running on port ${AppModule.port}`, 'Bootstrap');
}
bootstrap();

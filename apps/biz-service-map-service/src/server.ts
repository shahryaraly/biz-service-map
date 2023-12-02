import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from './core/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port ? port : "3001");
}

bootstrap();

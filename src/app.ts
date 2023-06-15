import { NestFactory } from '@nestjs/core';
import RootModule from './RootModule';

export default async () => {
  const app = await NestFactory.create(RootModule, { cors: true });
  app.enableCors();
  return app;
};

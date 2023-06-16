import { NestFactory } from '@nestjs/core';
import RootModule from './RootModule';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';



export default async () => {
  const server = express();
  const app = await NestFactory.create(RootModule, new ExpressAdapter(server));
  app.enableCors();

  server.get('/socket.io/*', (req, res) => {
    res.status(404).end();
  });
  return app;
};

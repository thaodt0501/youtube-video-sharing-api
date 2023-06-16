import createApp from './app';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await createApp();
  app.enableCors();
  const port = process.env.PORT || 8080;
  console.log(`The app listening on port ${port}`);
  await app.listen(port);
}
bootstrap();

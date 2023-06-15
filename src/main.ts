import createApp from './app';
async function bootstrap() {
  const app = await createApp();
  app.enableCors();
  const port = process.env.PORT || 8000;
  console.log(`The app listening on port ${port}`);
  await app.listen(port);
}
bootstrap();

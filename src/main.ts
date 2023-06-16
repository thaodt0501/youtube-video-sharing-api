import createApp from './app';
async function bootstrap() {
  const app = await createApp();
  app.enableCors({
    origin: 'http://localhost:3000', // specify the server origin
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });
  const port = process.env.PORT || 8000;
  console.log(`The app listening on port ${port}`);
  await app.listen(port);
}
bootstrap();

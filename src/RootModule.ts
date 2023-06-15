import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ExampleModule } from './example/example.module';
import { RouterModule } from 'nest-router';
import routes from './routers';
import { OpenaiModule } from './openai/openai.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.register({
      secret: 'yourSecretKey',  // Replace this with your own secret key
      signOptions: { expiresIn: '1h' },  // Token will expire in 1 hour
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DATABASE_NAME,
    }),
    RouterModule.forRoutes(routes()),
    ExampleModule,
    UserModule,
    VideoModule
    // OpenaiModule,


  ],
  providers: [],
})
export default class RootModule { }

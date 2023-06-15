import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ExampleModule } from './example/example.module';
import { RouterModule } from 'nest-router';
import routes from './routers';
import { OpenaiModule } from './openai/openai.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DATABASE_NAME,
    }),
    RouterModule.forRoutes(routes()),
    ExampleModule,
    OpenaiModule,
    AuthModule
  ],
  providers: [],
})
export default class RootModule {}

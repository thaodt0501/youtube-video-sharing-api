import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ExampleModule } from './example/example.module';
import { RouterModule } from 'nest-router';
import routes from './routers';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://root:rootpassword@localhost:27017/nest?authSource=admin&readPreference=primary', {
      dbName: 'usa',
    }),
    RouterModule.forRoutes(routes()),
    ExampleModule,
    UserModule,
    VideoModule,
    EventsModule


  ],
  providers: [EventsGateway],
})
export default class RootModule { }

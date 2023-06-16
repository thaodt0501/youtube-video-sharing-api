import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './video.schema';
import {JwtModule} from '@nestjs/jwt';
import {EventsGateway} from "../events/events.gateway";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '24h' },
    })
  ],
  controllers: [VideoController],
  providers: [VideoService, EventsGateway],
})

export class VideoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('/app');
  }
}

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailReply, EmailReplySchema } from 'schemas/email-replies.schema';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailReply.name, schema: EmailReplySchema },
    ]),
  ],
  providers: [OpenaiService],
  controllers: [OpenaiController],
})
export class OpenaiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('/app');
  }
}

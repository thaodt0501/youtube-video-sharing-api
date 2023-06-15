import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

@Module({
  imports: [],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('/app');
  }
}

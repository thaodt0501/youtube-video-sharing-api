import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../auth/local.strategy';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey',  // Replace this with your own secret key
      signOptions: { expiresIn: '1h' },  // Token will expire in 1 hour
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('/app');
  }
}

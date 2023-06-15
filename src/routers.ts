// import { AuthModule } from './auth/auth.module';
import { ExampleModule } from './example/example.module';
import { OpenaiModule } from './openai/openai.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';

export default () => {
  return [
    {
      path: '/example',
      module: ExampleModule,
    },
    // {
    //   path: 'api/openai',
    //   module: OpenaiModule,
    // },
    {
      path: 'api/',
      module: UserModule,
    },
    {
      path: 'api/',
      module: VideoModule,
    },
  ];
};

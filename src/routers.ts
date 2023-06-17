import { ExampleModule } from './example/example.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';

export default () => {
  return [
    {
      path: '/example',
      module: ExampleModule,
    },
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

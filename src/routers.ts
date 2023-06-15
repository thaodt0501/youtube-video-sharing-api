import { AuthModule } from './auth/auth.module';
import { ExampleModule } from './example/example.module';
import { OpenaiModule } from './openai/openai.module';

export default () => {
  return [
    {
      path: '/example',
      module: ExampleModule,
    },
    {
      path: 'api/openai',
      module: OpenaiModule,
    },
    {
      path: 'api/auth',
      module: AuthModule,
    },
  ];
};

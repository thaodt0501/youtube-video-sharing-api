import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const exampleController = app.get(ExampleController);
      expect(exampleController.getHello()).toBe('Hello World!');
    });
  });
});

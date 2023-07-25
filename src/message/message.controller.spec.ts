import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/user.entity';
import { MessageController } from './message.controller';
import { Message } from './message.entity';
import { MessageService } from './message.service';

describe('MessageController', () => {
  let messageController: MessageController;
  let messageService: MessageService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: {
            getById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    messageService = moduleRef.get<MessageService>(MessageService);
    messageController = moduleRef.get<MessageController>(MessageController);
  });

  it('should create a message', async () => { 
    const sender = new User(8n, 'yure', 'yure@gmail.com');
    const receiver = new User(9n, 'raquel', 'raquel@gmail.com');
    const message = new Message(sender, receiver, 'alo amigo');
    const result = await messageController.create(message);

    expect(result).toEqual(message);
  });
});

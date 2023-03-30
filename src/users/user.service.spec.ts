import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.entity';
import { UsersModule } from './users.module';

const usersList: User[] = [
  new User('alo', 'alo@hotmail'),
  new User('b', 'b@gmail.com'),
  new User('c', 'c@yahoo.com.br'),
];
const user = usersList[0];

describe('UserService', () => {
  let userService: UserService;
  const mockModel = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [
        UserService,
        {
          provide: getModelToken('Users'),
          useValue: {
            getAll: jest
              .fn()
              .mockImplementation(() => Promise.resolve(usersList)),
            getById: jest.fn().mockResolvedValue(user),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a array of users', async () => {
      const result = await userService.getAll();
      expect(result).toBe(usersList);
    });
  });
});

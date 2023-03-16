import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.entity';

const usersList: User[] = [
  new User('alo', 'alo@hotmail'),
  new User('b', 'b@gmail.com'),
  new User('c', 'c@yahoo.com.br'),
];
const user = usersList[0];

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            getAll: jest.fn().mockResolvedValue(usersList),
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

  describe('findAll', () => {
    it('should return a array of users', async () => {
      const result = await userService.getAll();
      expect(result).toBe(usersList);
    });
  });
});

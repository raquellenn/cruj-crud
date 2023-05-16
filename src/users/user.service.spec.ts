import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UsersModule } from './users.module';
import { UserDto } from './dtos/user.dto';

const usersList: User[] = [
  new User(1n, 'rafael', 'rpp0810@gmail.com'),
  new User(2n, 'Alice', 'alice@prisma.io'),
  new User(6n, 'Amanda', 'amandacosta@hotmail.com'),
];
const user = usersList[0];

describe('UserService', () => {
  let userService: UserService;
  const mockUserService = {
    getAll: jest.fn().mockResolvedValue(usersList),
    getById: jest.fn().mockResolvedValue(user),
    create: jest.fn().mockImplementation((user) => Promise.resolve(user)),
    update: jest.fn().mockImplementation((id, user) => Promise.resolve(user)),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            mockUserService,
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
      expect(result).toEqual(usersList);
    });
  });

  describe('getById', () => {
    it('should return a specific user found by id', async () => {
      const id = 6n
      const user = await userService.getById(id);
      expect(user).toEqual(usersList[2]);
    });
  });

  describe('create', () => {
    it('should return a created user', async () => {
      const user = new User(3n, 'raquel fulana', 'raqueltcost@gmail.com');
      const usercreated = await userService.create(user);
      expect(user).toEqual(usercreated);
    });
  });
});

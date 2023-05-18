import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UsersModule } from './users.module';
import { PrismaService } from './prisma.service';

const usersList: User[] = [
  new User(1n, 'rafael', 'rpp0810@gmail.com'),
  new User(2n, 'Alice', 'alice@prisma.io'),
  new User(6n, 'Amanda', 'amandacosta@hotmail.com'),
  new User(7n, 'raquel fulana', 'raqueltcost@gmail.com'),
  new User(10n, 'nathy', 'nathy@gmail.com'),
];
const user = usersList[0];
const updatedUser = new User(10n, 'ana', 'anacarol@toki.life');

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  const mockUserService = {
    getAll: jest.fn().mockResolvedValue(usersList),
    getById: jest.fn().mockResolvedValue(user),
    create: jest.fn().mockImplementation((user) => Promise.resolve(user)),
    update: jest
      .fn()
      .mockImplementation((id, user) => Promise.resolve(updatedUser)),
    delete: jest.fn().mockResolvedValue(null),
  };

  const mockPrismaService = {
    user: {
      findMany: jest.fn().mockResolvedValue(usersList),
      findUnique: jest.fn().mockResolvedValue(user),
      create: jest.fn().mockImplementation((user) => Promise.resolve(user)),
      update: jest
        .fn()
        .mockImplementation((id, user) => Promise.resolve(updatedUser)),
      delete: jest.fn().mockResolvedValue(null),
    },
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [
        UserService,
        PrismaService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result = await userService.getAll();
      expect(result).toEqual(usersList);
    });
  });

  describe('getById', () => {
    it('should return a specific user found by id', async () => {
      const id = 6n;
      const user = await userService.getById(id);
      expect(user).toEqual(usersList[2]);
    });
  });

  describe('create', () => {
    it('should return a created user', async () => {
      const user = new User(9n, 'nathy', 'nathyyy@gmail.com');
      const usercreated = await userService.create(user);
      expect(user).toEqual(usercreated);
    });
  });

  describe('update', () => {
    it('should updated a specific user', async () => {
      const result = await userService.update(10n, updatedUser);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('delete', () => {
    it('should delete a specific user', async () => {
      const deletedUser = await userService.delete(10n);
      expect(deletedUser).toBeNull();
    });
  });
});

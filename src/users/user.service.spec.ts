import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UsersModule } from './users.module';
import { PrismaService } from './prisma.service';

const usersList: User[] = [
  new User(1n, 'alo', 'alo@hotmail'),
  new User(2n, 'b', 'b@gmail.com'),
  new User(3n, 'c', 'c@yahoo.com.br'),
  new User(7n, 'fulano', 'fulano@google.com'),
];

const updatedUser = new User(3n, 'a', 'a@hotmail.com');

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  const mockPrisma = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
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
      jest
        .spyOn<any, any>(prismaService.user, 'findMany')
        .mockResolvedValue(usersList);
      const result = await userService.getAll();
      expect(result).toEqual(usersList);
    });
  });

  describe('getById', () => {
    it('should return a specific user found by id', async () => {
      const user = usersList[2];
      const id = 3n;
      jest
        .spyOn<any, any>(prismaService.user, 'findUnique')
        .mockResolvedValue(user);

      const result = await userService.getById(id);
      expect(result).toEqual(usersList[2]);
    });
  });

  describe('create', () => {
    it('should return a created user', async () => {
      jest
        .spyOn<any, any>(prismaService.user, 'create')
        .mockResolvedValue(new User(4n, 'd', 'd@life.com'));
      const result = await userService.create(new User(4n, 'd', 'd@life.com'));
      expect(result).toEqual(new User(4n, 'd', 'd@life.com'));
    });
  });

  describe('update', () => {
    it('should updated a specific user', async () => {
      jest
        .spyOn<any, any>(prismaService.user, 'update')
        .mockResolvedValue(updatedUser);
      const result = await userService.update(4n, updatedUser);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('delete', () => {
    it('should delete a specific user', async () => {
      jest
        .spyOn<any, any>(prismaService.user, 'delete')
        .mockResolvedValue(undefined);
      const deletedUser = await userService.delete(7n);
      expect(deletedUser).toBeUndefined();
    });
  });
});

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

const usersList: User[] = [
  new User(1n, 'alo', 'alo@hotmail'),
  new User(2n, 'b', 'b@gmail.com'),
  new User(3n, 'c', 'c@yahoo.com.br'),
];
const user = usersList[0];
const createdUser = new User(4n, 'd', 'd@hotmail.com');
const updatedUser = new User(4n, 'a', 'a@hotmail.com');

describe('UsersController', () => {
  let usersController: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(usersList),
            getById: jest.fn().mockResolvedValue(user),
            create: jest.fn().mockResolvedValue(createdUser),
            update: jest.fn().mockResolvedValue(updatedUser),
            delete: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  it('should be defined', async () => {
    expect(usersController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      // act
      const result = await usersController.getAll();
      // assert
      expect(result).toBe(usersList);
    });
  });

  describe('getById', () => {
    it('should return a specific user', async () => {
      //arrange
      const id = 8n;
      //act
      const result = await usersController.getById(id);
      //assert
      expect(result).toEqual(user);
    });

    it('should throw a error if a user is not found', async () => {
      const id = 10n;
      jest.spyOn(userService, 'getById').mockResolvedValue(null);

      await expect(usersController.getById(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      //arrange
      const createUserDto = { name: 'd', email: 'd@hotmail.com' };
      //act
      const result = await usersController.create(createUserDto);
      //assert
      expect(result).toEqual(createdUser);
    });

    it('should throw an error if user is invalid', async () => {
      const invalidUser = { name: '82273', email: 'invalid_email' };
      jest
        .spyOn(userService, 'create')
        .mockRejectedValueOnce(new BadRequestException('Invalid user'));

      await expect(usersController.create(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      //arrange
      const id = 1n;
      const updateUserDto = { name: 'a', email: 'a@hotmail.com' };

      //act
      const result = await usersController.update(id, updateUserDto);

      //assert
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if user is not found', async () => {
      //arrange
      const id = 10n;
      jest.spyOn(userService, 'update').mockResolvedValue(null);
      const updateUser = { name: 'bli', email: 'suarez@hotmail.com' };

      //assert
      await expect(usersController.update(id, updateUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('delete', () => {
    it('should delete an existing user', async () => {
      //arrange
      const id = 1n;
      //act
      const result = await usersController.delete(id);
      //assert
      expect(result).toBeUndefined();
    });
    it('should throw a error if not found the user', async () => {
      const id = 6n;
      jest
        .spyOn(userService, 'delete')
        .mockRejectedValue(new NotFoundException('User Not Found'));
      await expect(usersController.delete(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

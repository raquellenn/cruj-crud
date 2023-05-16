import { Get, Injectable, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  @Get()
  async getById(id: bigint): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  @Post()
  async create(user: UserDto): Promise<User> {
    const data = {
      name: user.name,
      email: user.email,
    };
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    return this.prisma.user.create({ data: data });
  }

  @Post()
  async update(id: bigint, user: User): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data: user });
  }

  async delete(id: bigint) {
    return await this.prisma.user.delete({ where: { id } });
  }
}

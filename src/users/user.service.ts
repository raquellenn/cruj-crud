import {
  Delete,
  Get,
  Injectable,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get(':id')
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

  @Put(':id')
  async update(id: bigint, user: User): Promise<User> {
    try {
      return await this.prisma.user.update({ where: { id }, data: user });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async delete(id: bigint) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

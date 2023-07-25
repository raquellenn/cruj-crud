import { Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/users/prisma.service';
import { Message } from './message.entity';

export class MessageService {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getById(id: bigint): Promise<Message[]> {
    return await this.prisma.message.findUnique({ where: id });
  }

  @Post()
  async create(message: Message): Promise<Message> {
    return this.prisma.message.create(message);
  }
}

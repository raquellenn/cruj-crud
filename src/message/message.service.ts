import { Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/users/prisma.service';
import { Message } from './message.entity';

export class MessageService {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAll(): Promise<Message[]> {
    return await this.prisma.message.findMany();
  }

  @Post()
  async create(message: Message): Promise<Message> {
    return this.prisma.message.create()
  }
}

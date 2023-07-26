import { Get, Injectable, Post } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/users/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getById(id) {
    return await this.prisma.message.findUnique({ where: id });
  }

  @Post()
  async create(message: Message) {
    return this.prisma.message.create({ data: message });
  }
}

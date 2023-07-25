import {
  BadRequestException,
  Body,
  Get,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Message } from './message.entity';
import { MessageService } from './message.service';

export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async create(@Body(new ValidationPipe()) message: Message): Promise<Message> {
    try {
      return await this.messageService.create(message);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getById(@Param('id') id: bigint) {
    const foundById = await this.messageService.getById(id);
    if (!foundById) {
      throw new NotFoundException('Message Not Found');
    }
    return foundById;
  }
}

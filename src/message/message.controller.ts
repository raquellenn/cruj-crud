import { Body, Post, ValidationPipe } from '@nestjs/common';
import { Message } from './message.entity';
import { MessageService } from './message.service';

export class MessageController {
  constructor(private messageService: MessageService){};

  @Post()
  async create(@Body(new ValidationPipe()): messaged: Message): Promise<Message> {
    try {
      return await this.messageService.create(message)
    }
  };
}
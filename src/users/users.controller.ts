import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    await this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    await this.userService.getById(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    user.id = id;
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.userService.delete(id);
  }
}

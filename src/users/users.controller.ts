import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: bigint) {
    const foundById = await this.userService.getById(id);
    if (!foundById) {
      throw new NotFoundException('User Not Found');
    }
    return foundById;
  }

  @Post()
  async create(@Body(new ValidationPipe()) user: UserDto): Promise<UserDto> {
    try {
      return await this.userService.create(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: bigint,
    @Body(new ValidationPipe()) user: UserDto,
  ) {
    const updatedUser = await this.userService.update(id, user);
    if (!updatedUser) {
      throw new NotFoundException('User Not Found');
    }
    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: bigint) {
    const user = await this.getById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    await this.userService.delete(id);
  }
}

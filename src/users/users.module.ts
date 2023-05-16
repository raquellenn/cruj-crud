import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaService],
})
export class UsersModule {}

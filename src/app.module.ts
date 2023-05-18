import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './users/prisma.service';

@Module({
  imports: [PrismaService, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

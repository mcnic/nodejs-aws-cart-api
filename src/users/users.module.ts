import { Module } from '@nestjs/common';

import { UsersService } from './services';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}

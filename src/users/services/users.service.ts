import { Injectable } from '@nestjs/common';

import { User } from '../models';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(userId: string): Promise<User> {
    const user = await this.prismaService.findCartByUserId(userId);

    return plainToClass(User, user);
  }

  async createOne({ name, password }: User): Promise<User> {
    const newUser = await this.prismaService.createUser({ name, password });

    return plainToClass(User, newUser);
  }
}

import { Body, Controller, Get, Put, Req } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { UsersService } from './services';

@Controller('api/user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  async findUserCart(@Req() req: AppRequest): Promise<any> {
    const user = await this.userService.findOne('');
    console.log({ user });

    return user
  }
}


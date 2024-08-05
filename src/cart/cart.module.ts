import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { CartController } from './cart.controller';
import { CartService } from './services';


@Module({
  imports: [ OrderModule, PrismaModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}

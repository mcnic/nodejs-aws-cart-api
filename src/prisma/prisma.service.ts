import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { Cart, CartStatuses } from '../cart/models';

@Injectable()
export class PrismaService extends PrismaClient {
  async findCartByUserId(userId: string): Promise<Cart> {
    const cart = await this.cart.findFirst({
      where: {
        // user_id: userId, - todo: add auth
        status: CartStatuses.OPEN,
      },
      include: {
        items: {
          select: {
            product: true,
            count: true,
          },
        },
      },
    });
    
    console.log({ cart });

    return plainToClass(Cart, cart);
  }
}

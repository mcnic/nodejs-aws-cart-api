import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';

import { Cart, updatedItemDto } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.prisma.findCartByUserId(userId);

    return plainToClass(Cart, cart);
  }

  createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      items: [],
    } as Cart; // TODO: Fix this

    this.userCarts[userId] = userCart;

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    updatedItem: updatedItemDto,
  ): Promise<Cart> {
    await this.prisma.updateCartByUserId(userId, updatedItem);

    const cart = await this.prisma.findCartByUserId(userId);

    return await this.findByUserId(userId);
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}

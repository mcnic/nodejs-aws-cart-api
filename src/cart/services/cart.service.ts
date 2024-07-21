import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  constructor(private prisma: PrismaService) {}

  findByUserId(userId: string): Promise<Cart> {
    return this.prisma.findCartByUserId(userId);
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

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    this.userCarts[userId] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}

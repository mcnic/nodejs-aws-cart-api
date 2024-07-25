import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CartStatuses } from '../cart/models';
import { OrderDto } from 'src/order/models';
import { UserDto } from 'src/users';

@Injectable()
export class PrismaService extends PrismaClient {
  async findCartByUserId(userId: string) {
    return await this.cart.findFirst({
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
  }

  async createCartByUserId(id: string) {
    const createdCart = await this.cart.create({
      data: { user_id: id },
      include: {
        items: {
          select: { product_id: true, count: true },
        },
      },
    });
    return createdCart;
  }

  async findOrCreateCartByUserId(userId: string) {
    return (
      (await this.findCartByUserId(userId)) ??
      (await this.createCartByUserId(userId))
    );
  }

  // async updateCartByUserId(userId: string, updatedItem: CartItemDto) {
  //   const cart = await this.findOrCreateCartByUserId(userId);

  //   const updatedCart = await this.cart.update({
  //     where: { id: cart.id },
  //     data: {
  //       items: {
  //         upsert: {
  //           where: {
  //             cart_id_product_id: {
  //               cart_id: cart.id,
  //               product_id: updatedItem.product_id,
  //             },
  //           },
  //           create: {
  //             product_id: updatedItem.product_id,
  //             count: updatedItem.count,
  //           },
  //           update: { count: updatedItem.count },
  //         },
  //       },
  //       updated_at: new Date(),
  //     },
  //     include: {
  //       items: {
  //         select: { product_id: true, count: true },
  //       },
  //     },
  //   });

  //   return updatedCart;
  // }

  async createOrder(orderDto: any) {
    const [createdOrder, updatedCart] = await this.$transaction([
      this.order.create({
        data: orderDto,
        include: {
          cart: false,
        },
      }),
      this.cart.update({
        where: { id: orderDto.cart_id },
        data: {
          status: CartStatuses.ORDERED,
          updated_at: new Date(),
        },
        select: {
          id: true,
          status: true,
          items: {
            select: {
              product_id: true,
              count: true,
            },
          },
        },
      }),
    ]);
    return { ...createdOrder, cart: { ...updatedCart } };
  }

  async createUser(user: UserDto) {
    const createdUser = await this.user.create({ data: user });
    return createdUser;
  }

  async findUserById(id: string) {
    const foundUser = await this.user.findUnique({ where: { id } });
    return foundUser;
  }

  async findUserByName(name: string) {
    const foundUser = await this.user.findUnique({ where: { name } });
    return foundUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.user.delete({ where: { id } });
    return deletedUser;
  }
}

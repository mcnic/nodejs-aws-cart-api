import { Injectable } from '@nestjs/common';
import { Order, OrderDto } from '../models';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async findById(orderId: string): Promise<Order> {
    const order = await this.prismaService.order.findFirst({
      where: {
        id: orderId,
      },
    });

    return plainToClass(Order, order);
  }

  async create(dto: OrderDto): Promise<Order> {
    const order = await this.prismaService.createOrder(dto);

    return plainToClass(Order, order);
  }

  async update(orderId, data: OrderDto) {
    const findedOrder = this.findById(orderId);

    if (!findedOrder) {
      throw new Error('Order does not exist.');
    }

    const order = await this.prismaService.order.update({
      where: { id: orderId },
      data: {
        ...data,
      } as any,
    });
  }
}

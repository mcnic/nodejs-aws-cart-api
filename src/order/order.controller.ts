import { Body, Controller, Get, Put, Req } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { Order, OrderDto, OrderItem, OrderResponse, OrderService } from '.';
import { AppRequest, getUserIdFromRequest } from '../shared';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest): Promise<OrderResponse> {
    const orders = await this.orderService.getAllOrders();
    console.log({ orders });

    return orders.map((order) => ({
      id: '',
      addderss: {},
      items: order.items.map((e) => ({
        productId: '',
        count: 1,
      })),
      statusHistory: '',
    }));
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async addOrder(
    @Req() req: AppRequest,
    @Body() body: OrderDto,
  ): Promise<Order> {
    const order = await this.orderService.create(body);

    return order;
  }
}


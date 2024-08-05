import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderController } from './order.controller';

@Module({
  imports: [PrismaModule],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}

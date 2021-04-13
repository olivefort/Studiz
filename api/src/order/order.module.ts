import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from './order.schema';
import { PartnerModule } from '../partner/partner.module';
import { UserModule } from '../user/user.module';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    UserModule,
    PartnerModule,
    NotificationModule,
    MongooseModule.forFeature([{ name: 'order', schema: orderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService, MongooseModule],
})
export class OrderModule {}

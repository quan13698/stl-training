import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { orderSchema } from './order.schema';
import { OrderService } from './order.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/stl-training-order-payment'),
    MongooseModule.forFeature([{name: 'order', schema: orderSchema}]),
    UserModule,
    AuthModule
  ],
  controllers: [OrderController],
  providers: [OrderService, UserService],
})
export class AppModule {}

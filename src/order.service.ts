import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './createOrder.dto';
import { Order } from './order.schema';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('order') private readonly orderModel: Model<Order>
    ) { }

    async createOrder(creatdeOrderDto: CreateOrderDto) {
        const newOrder = await this.orderModel.create(creatdeOrderDto);
        await newOrder.save();
        return {
            success: true,
            order: newOrder
        }
    }

    async getOrderStatus(id: string) {
        const order = await this.orderModel.findById({ _id: id });
        if (!order) {
            return {
                success: false,
                message: `Order ${id} not found`
            }
        }
        return {
            success: true,
            status: order.status
        }
    }

    async payment(id: string) {
        const order = await this.orderModel.findById({ _id: id });
        if (!order) {
            return {
                success: false,
                message: `Order ${id} not found`
            }
        }
        const testOrder = await fetch(`http://localhost:3001/payment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: order.status
            })

        })
            .then((res) => res.text())
        const newORderInfo = {
            status: testOrder

        }
        const updateOrderStatus = await this.orderModel.findByIdAndUpdate(id, newORderInfo);
        await updateOrderStatus.save()
        return {
            success: true,
            order: updateOrderStatus
        }

            
    }
}

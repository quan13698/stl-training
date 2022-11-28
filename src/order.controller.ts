import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateOrderDto } from './createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private authService: AuthService,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Body() creatdeOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(creatdeOrderDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getOrders() {
        return 'hello from order'
    }   

    @UseGuards(JwtAuthGuard)
    @Post('payment/:id')
    payment(@Param('id') id: string) {
        return this.orderService.payment(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('status/:id')
    getOrderStatus(@Param('id') id: string) {
        return this.orderService.getOrderStatus(id)
    }
}

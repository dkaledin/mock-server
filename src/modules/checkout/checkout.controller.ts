import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutRequest } from './checkout.request';

@Controller('checkout')
export class CheckoutController {
    @Post('placeOrder')
    public placeOrder(@Body() order: CheckoutRequest) {
        return {
            orderId: Math.round((1 - Math.random()) * 100000),
        };
    }
}

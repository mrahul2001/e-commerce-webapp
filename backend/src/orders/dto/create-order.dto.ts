import { IsObject, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsObject()
    orderDetails: Record<string, any>;

    @IsString()
    shippingAddress: string;
}
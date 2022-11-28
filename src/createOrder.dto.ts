import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    productCode: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;

    @IsString()
    status: string;
}
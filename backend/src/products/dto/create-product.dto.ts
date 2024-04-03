import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    productName: string;

    @IsNumber()
    productPrice: number;

    @IsString()
    productImage: string;

    @IsString()
    productDescription: string;

    @IsNumber()
    productAvailability: number;

    @IsNumber()
    productRating: number;
}

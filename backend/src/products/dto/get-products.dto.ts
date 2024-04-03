import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class GetProductDto {
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    productName: string | undefined;

    @IsNumber()
    @ValidateIf((object, value) => value !== undefined)
    productPrice: number | undefined;

    @IsNumber()
    @ValidateIf((object, value) => value !== undefined)
    productAvailability: number | undefined;

    @IsNumber()
    @ValidateIf((object, value) => value !== undefined)
    productRating: number | undefined;
}

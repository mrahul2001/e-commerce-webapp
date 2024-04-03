import { IsDateString, IsString, ValidateIf } from "class-validator";

export class GetOrderDto {
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    orderId: string | undefined;

    @IsDateString()
    @ValidateIf((object, value) => value !== undefined)
    createdAt: Date | undefined;
}

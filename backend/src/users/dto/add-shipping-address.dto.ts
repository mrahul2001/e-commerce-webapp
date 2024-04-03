import { IsNotEmpty, IsString } from "class-validator";

export class AddAddressDto {
    @IsNotEmpty()
    @IsString()
    shippingAddress: string;
}

import { IsAlphanumeric, IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    password: string;
}

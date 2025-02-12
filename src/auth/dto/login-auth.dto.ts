import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginAuthDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    password: string;
}
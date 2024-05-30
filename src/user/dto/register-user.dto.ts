import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class RegisterUserDto {    
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    password: string;
    
    @IsNotEmpty()
    @IsNumber()
    roleId: number;
}
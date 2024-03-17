import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    id?: number;

    @IsString()
    @IsNotEmpty()
    name?: string;
    
    @IsEmail()
    email?: string;
    
    @IsEnum(["ADMIN", "CLIENT", "AGENT"], {
        message: "Valid role required"
    })
    role?: "ADMIN" | "CLIENT" | "AGENT";
}
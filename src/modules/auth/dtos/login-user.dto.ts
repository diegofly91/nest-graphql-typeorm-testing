import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Length(8, 60)
    @IsString()
    @IsNotEmpty()
    password: string;
}

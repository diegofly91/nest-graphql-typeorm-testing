import { Status } from '@/modules/shared/enums';
import { IsNotEmpty, IsOptional, IsNumber, IsString, MaxLength, MinLength, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
    @MinLength(5, { message: 'El email es muy corto' })
    @MaxLength(100, { message: 'El email es muy largo' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    roleId: number;

    @IsString()
    @IsNotEmpty()
    @Length(8, 60)
    password: string;

    @IsString()
    @IsOptional()
    status: keyof typeof Status = Status.ACTIVE;
}

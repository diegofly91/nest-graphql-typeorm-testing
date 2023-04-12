import { Status } from '@/modules/shared/enums';
import { IsNotEmpty, IsOptional, IsNumber, IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
    @MinLength(5, { message: 'El email es muy corto' })
    @MaxLength(100, { message: 'El email es muy largo' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    roleId: number;

    @MinLength(8, { message: 'La contraseña es muy corta' })
    @MaxLength(60, { message: 'La contraseña es muy larga' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsOptional()
    status: keyof typeof Status = Status.ACTIVE;
}

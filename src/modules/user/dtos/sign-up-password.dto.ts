import { IsNotEmpty, IsString, MaxLength, MinLength, Matches } from 'class-validator';
import { IsEqualTo } from '../decorators';

export class SignUpPasswordDto {
    @Matches(/^([A-Za-z\d$@$!%*?&]|[^ ]){8,60}$/)
    @MinLength(8, { message: 'La contraseña es muy corta' })
    @MaxLength(60, { message: 'La contraseña es muy larga' })
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsEqualTo<SignUpPasswordDto>('password')
    passwordConfirm: string;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { socialProviders } from '../constants/constants';
import { RoleType } from '@/modules/role/enums';

export class LoginSocialDto {
    @IsNotEmpty()
    @IsString()
    accessToken: string;

    @IsNotEmpty()
    @IsString()
    provider: keyof typeof socialProviders;

    @IsNotEmpty()
    @IsOptional()
    roleType: keyof typeof RoleType;
}

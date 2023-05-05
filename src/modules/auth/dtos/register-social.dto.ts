import { IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from '@/modules/role/enums';
import { socialProviders } from '../constants/constants';

export class RegisterSocialDto {
    @IsNotEmpty()
    @IsString()
    accessToken: string;

    @IsNotEmpty()
    @IsString()
    provider: keyof typeof socialProviders;

    @IsNotEmpty()
    @IsString()
    roleType: keyof typeof RoleType;
}

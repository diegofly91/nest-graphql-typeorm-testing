import { IsNotEmpty, IsString } from 'class-validator';
import { socialProviders } from '../constants/constants';

export class LoginSocialDto {
    @IsNotEmpty()
    @IsString()
    accessToken: string;

    @IsNotEmpty()
    @IsString()
    provider: keyof typeof socialProviders;
}

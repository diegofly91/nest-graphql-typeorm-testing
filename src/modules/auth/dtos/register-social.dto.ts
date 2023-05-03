import { IsNotEmpty } from 'class-validator';
import { LoginSocialDto } from './login-social.dto';
import { RoleType } from '@/modules/role/enums';

export class RegisterSocialDto extends LoginSocialDto {
    @IsNotEmpty()
    @IsNotEmpty()
    roleType: keyof typeof RoleType;
}

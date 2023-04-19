import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '@/modules/user/services';
import { Status } from '@/modules/shared/enums';
import { LoginUserDto } from '../dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            emailField: 'email',
            passwordField: 'password',
        });
    }

    async validate({ email, password }: LoginUserDto): Promise<any> {
        const user = await this.userService.getPasswordByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password)))
            throw new NotFoundException('Alguno de los datos no coincide');
        if (user.status !== Status.ACTIVE) throw new NotFoundException('El usuario esta no esta ACTIVO');
        if (!user) throw new UnauthorizedException();
        return user;
    }
}

import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos';
import { UserService } from '@/modules/user/services';
import { Status } from '@/modules/shared/enums';

@Injectable()
export class LoginValidateGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { email, password }: LoginUserDto = await ctx.getArgs().input;
        const user = await this.userService.getPasswordByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password)))
            throw new NotFoundException('Alguno de los datos no coincide');
        if (user.status !== Status.ACTIVE) throw new NotFoundException('El usuario esta no esta ACTIVO');
        return true;
    }
}

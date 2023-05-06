import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos';
import { UserService } from '@/modules/user/services';
import { Status } from '@/modules/shared/enums';
import { MESSAGES } from '@/modules/shared/constants';

@Injectable()
export class LocalAuthGuard implements CanActivate {
    constructor(public readonly userService: UserService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { email, password }: LoginUserDto = await ctx.getArgs().input;
        const user = await this.userService.getPasswordByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password)))
            throw new NotFoundException(MESSAGES.LOGIN_DATA_ERROR);
        if (user.status !== Status.ACTIVE) throw new NotFoundException(MESSAGES.USER_NOT_ACTIVE);
        return true;
    }
}

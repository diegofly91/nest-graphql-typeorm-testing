import { LoginValidateGuard } from '@/modules/auth/guards';
import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LoginUserDto } from '@/modules/auth/dtos';
import { Status } from '@/modules/shared/enums';
import { MESSAGES } from '@/modules/shared/constants';

export class LoginValidateGuardMock extends LoginValidateGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { email, password }: LoginUserDto = await ctx.getArgs().input;
        const user = await this.userService.getPasswordByEmail(email);
        if (!user || password !== user.password) throw new NotFoundException(MESSAGES.LOGIN_DATA_ERROR);
        if (user.status !== Status.ACTIVE) throw new NotFoundException(MESSAGES.USER_NOT_ACTIVE);
        return true;
    }
}

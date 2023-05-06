import { LocalAuthGuard } from '@/modules/auth/guards';
import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MESSAGES } from '@/modules/shared/constants';
import { Status, LoginUserDto } from '../../gql/queries';

export class LocalAuthGuardMock extends LocalAuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { email, password }: LoginUserDto = await ctx.getArgs().input;
        const user = await this.userService.getPasswordByEmail(email);
        if (!user || password !== user.password) throw new NotFoundException(MESSAGES.LOGIN_DATA_ERROR);
        if (user.status !== Status.Active) throw new NotFoundException(MESSAGES.USER_NOT_ACTIVE);
        return true;
    }
}

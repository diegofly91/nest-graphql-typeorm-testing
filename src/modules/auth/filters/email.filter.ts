import { Catch, ExceptionFilter, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '@/modules/user/services';
import { MESSAGES } from '@/modules/shared/constants';
@Catch()
@Injectable()
export class MyExceptionsEmailFilter implements ExceptionFilter {
    constructor(private readonly userService: UserService) {}

    async catch(exception, host: ExecutionContext) {
        const res = host.switchToHttp();
        const response = res.getResponse();
        const ctx = GqlExecutionContext.create(host);
        const profile = ctx.getContext().req.user;
        if (!profile) {
            throw new HttpException(MESSAGES.LOGIN_SOCIAL_NOT_ACCEPTABLE, HttpStatus.NOT_ACCEPTABLE);
        }
        const emails = profile.emails;
        const email = emails[0].value;
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new HttpException(MESSAGES.EMAIL_NOT_EXIST, HttpStatus.PRECONDITION_FAILED);
        }
        response.status(400).json(exception.response);
    }
}

import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../services';
import { CreateUserDto } from '../dtos';
import { MESSAGES } from '@/modules/shared/constants';

@Injectable()
export class UserCreateGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { email }: CreateUserDto = ctx.getArgs().input;
        const usernameExists = await this.userService.getUserByEmail(email);
        if (usernameExists) {
            throw new HttpException(MESSAGES.EMAIL_EXIST, HttpStatus.PRECONDITION_FAILED);
        }
        return true;
    }
}

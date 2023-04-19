import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../services';
import { IUserPayload } from '../interfaces';
import { MESSAGES } from '@/modules/shared/constants';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context).getContext();
        const token = ctx.headers.authorization;

        try {
            const user: IUserPayload = await this.authService.userCurrentData(token);
            if (!(user && roles.includes(user.roleName))) {
                throw new HttpException(MESSAGES.UNAUTORIZATED_USER, HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            throw new HttpException(MESSAGES.UNAUTORIZATED_USER, HttpStatus.UNAUTHORIZED);
        }
        return true;
    }
}

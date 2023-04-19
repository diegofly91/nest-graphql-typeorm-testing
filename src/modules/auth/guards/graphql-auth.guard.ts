import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        const token = ctx.headers.authorization;
        console.log({ token });
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            ctx.user = await this.authService.userCurrentData(token);
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }
}

import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LoginSocialDto } from '../dtos';
import { CustomAuthGuard } from './custom-auth.guard';

@Injectable()
export class SocialAuthGuard extends CustomAuthGuard() {
    getRequest(context: any) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const { accessToken, provider }: LoginSocialDto = ctx.getArgs().input;
        req.body = {
            ...req.body,
            access_token: accessToken,
            provider,
        };
        return req;
    }
}

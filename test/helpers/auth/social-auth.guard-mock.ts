import { ExecutionContext, Optional, UnauthorizedException } from '@nestjs/common';
import { SocialAuthGuard } from '@/modules/auth/guards';
import { defaultOptions } from '@nestjs/passport/dist/options';
import { AuthModuleOptions } from '@nestjs/passport';
import { usersSocialMock } from './users-social.mock';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LoginSocialDto } from '@/modules/auth/dtos';

export class SocialAuthGuardMock extends SocialAuthGuard {
    constructor(@Optional() protected readonly options: AuthModuleOptions) {
        super(options);
        this.options = this.options || {};
    }

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

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const options = { ...defaultOptions, ...this.options };
        const [request, response] = [this.getRequest(context), context.switchToHttp().getResponse()];
        //const passportFn = createPassportContext(request, response);
        const user = usersSocialMock.find(
            (userS) =>
                userS.input.provider === request.body.provider && userS.input.accessToken === request.body.access_token,
        )?.user;
        if (!user || user === undefined) {
            throw new UnauthorizedException();
        }
        request[options.property || defaultOptions.property] = user;
        return true;
    }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const SocialProfile = createParamDecorator(async (data: string, ctx: ExecutionContext) => {
    const profile = GqlExecutionContext.create(ctx).getContext().req.user;
    const { name, emails } = profile;
    const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
    };

    return data ? user && user[data] : user;
});

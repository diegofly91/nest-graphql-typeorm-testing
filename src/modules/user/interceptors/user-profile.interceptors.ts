import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../entities';
import { ProfileService } from '../services';
import { InputProfileUserDto } from '../dtos';

export function UserProfileInterceptor() {
    @Injectable()
    class ProfileInterceptor implements NestInterceptor {
        constructor(public readonly profileService: ProfileService) {}

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const ctx = GqlExecutionContext.create(context);
            const input: InputProfileUserDto = ctx.getArgs().inputPro;

            return next.handle().pipe(
                tap(async (res: User) => {
                    if (input && res) {
                        const { id } = res;
                        await this.profileService.createProfileUser(id, input);
                    }
                }),
            );
        }
    }
    const Interceptor = mixin(ProfileInterceptor);
    return Interceptor;
}

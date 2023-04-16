import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../entities';
import { ProfileService } from '../services';
import { InputProfileUserDto } from '../dtos';

@Injectable()
export class UserProfileInterceptor implements NestInterceptor {
    constructor(public readonly profileService: ProfileService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const ctx = GqlExecutionContext.create(context);
        const inputPro: InputProfileUserDto = ctx.getArgs().inputPro;
        return next.handle().pipe(
            tap(async (res: User) => {
                if (inputPro && res) {
                    const { id } = res;
                    await this.profileService.createProfileUser(id, inputPro);
                }
            }),
        );
    }
}

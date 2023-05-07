import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../entities';
import { ProfileService } from '../services';
import { CreateUserDto, InputProfileUserAdviserDto } from '../dtos';
import { RoleService } from '@/modules/role/services';
import { RoleType } from '@/modules/role/enums';
import { Role } from '@/modules/role/entities';

@Injectable()
export class ProfileAdviserInterceptor implements NestInterceptor {
    constructor(public readonly profileService: ProfileService, public readonly roleService: RoleService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const ctx = GqlExecutionContext.create(context);
        const role: Role = await this.roleService.getRoleByName(RoleType.ADVISER);
        const input: CreateUserDto = ctx.getArgs().input;
        input.roleId = role.id;
        const inputPro: InputProfileUserAdviserDto = ctx.getArgs().inputPro;
        if (!inputPro) throw new Error('inputPro is required');
        return next.handle().pipe(
            tap(async (res: User) => {
                if (res) {
                    const { id } = res;
                    await this.profileService.createProfileUser(id, inputPro);
                }
            }),
        );
    }
}

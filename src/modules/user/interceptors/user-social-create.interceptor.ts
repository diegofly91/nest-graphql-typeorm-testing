import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ProfileService, UserService } from '../services';
import { User } from '../entities';
import { CreateUserDto, InputProfileUserDto } from '../dtos';
import { LoginSocialDto } from '@/modules/auth/dtos';
import { RoleService } from '@/modules/role/services';
import { Status } from '@/modules/shared/enums';
import { RoleType } from '@/modules/role/enums';

@Injectable()
export class CreateUserSocialInterceptor implements NestInterceptor {
    constructor(
        public readonly userService: UserService,
        public readonly profileService: ProfileService,
        public readonly roleService: RoleService,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const ctx = GqlExecutionContext.create(context);
        const { roleType }: LoginSocialDto = ctx.getArgs().input;
        const profile = ctx.getContext().req.user;
        const { name, emails } = profile;
        const userSocial = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
        };
        const user: User = await this.userService.getUserByEmail(userSocial.email);
        if (!user && roleType) {
            const role = await this.roleService.getRoleByName(roleType);
            const status = RoleType[roleType] === RoleType.CUSTOMER ? Status.ACTIVE : Status.PREACTIVE;
            const userDto: CreateUserDto = {
                email: userSocial.email,
                roleId: role.id,
                password: '',
                status,
            };
            const userCreated: User = await this.userService.createUser(userDto);
            const profileDto: InputProfileUserDto = {
                firstname: userSocial.firstName,
                lastname: userSocial.lastName,
                city: '',
                address: '',
            };
            await this.profileService.createProfileUser(userCreated.id, profileDto);
        }
        return next.handle().pipe(tap());
    }
}

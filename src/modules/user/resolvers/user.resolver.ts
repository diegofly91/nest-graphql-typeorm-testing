import { UsePipes, ValidationPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserDto, InputProfileUserDto } from '../dtos';
import { User, UserProfile } from '../entities';
import { Role } from '@/modules/role/entities';
import { RoleService } from '@/modules/role/services';
import { RoleType } from '@/modules/role/enums';
import { UserService, ProfileService } from '../services';
import { RolesGuard } from '@/modules/auth/guards';
import { Roles } from '@/modules/role/decorators';
import { AuthGuard } from '@/modules/auth/guards/';
import { UserProfileInterceptor } from '../interceptors';
import { UserCreateGuard } from '../guards';
import { IUserPayload } from '@/modules/auth/interfaces';

@UseGuards(RolesGuard)
@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly profileService: ProfileService,
    ) {}

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @UseGuards(AuthGuard)
    @Query(() => User, { nullable: true })
    async getUserData(@Context('user') { id }: IUserPayload): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN, RoleType.ADVISER)
    @Query(() => User, { nullable: true })
    async getUser(@Args('id') id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    @UseGuards(UserCreateGuard)
    @UseInterceptors(UserProfileInterceptor)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async createUser(
        @Args('input') input: CreateUserDto,
        // dejar el inputPro en Args no reconoce error en el interceptor
        @Args('inputPro') inputPro: InputProfileUserDto,
    ): Promise<User> {
        return await this.userService.createUser(input);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    async deleteUser(@Args('id') id: number): Promise<User> {
        return await this.userService.deleteUser(id);
    }

    @ResolveField('role', () => Role)
    async role(@Parent() user) {
        const { roleId } = user;
        return await this.roleService.getRoleById(roleId);
    }

    @ResolveField('profile', () => UserProfile)
    async profile(@Parent() user) {
        const { id } = user;
        return await this.profileService.getProfileUserById(id);
    }
}

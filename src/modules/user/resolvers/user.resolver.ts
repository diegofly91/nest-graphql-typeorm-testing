import { UsePipes, ValidationPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserDto, InputProfileUserDto, SignUpPasswordDto, InputProfileUserAdviserDto } from '../dtos';
import { User, UserProfile } from '../entities';
import { Role } from '@/modules/role/entities';
import { RoleService } from '@/modules/role/services';
import { RoleType } from '@/modules/role/enums';
import { UserService, ProfileService } from '../services';
import { RolesGuard } from '@/modules/auth/guards';
import { Roles } from '@/modules/role/decorators';
import { AuthGuard } from '@/modules/auth/guards/';
import { UserProfileInterceptor, UserProfileAdviserInterceptor } from '../interceptors';
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
        // leaving the inputPro in Args does not recognize error in the interceptor
        @Args('inputPro') inputPro: InputProfileUserDto,
    ): Promise<User> {
        return await this.userService.createUser(input);
    }

    @UseGuards(UserCreateGuard)
    @UseInterceptors(UserProfileAdviserInterceptor)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async createUserAdviser(
        @Args('input') input: CreateUserDto,
        // leaving the inputPro in Args does not recognize error in the interceptor
        @Args('inputPro') inputPro: InputProfileUserAdviserDto,
    ): Promise<User> {
        return await this.userService.createUser(input);
    }

    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async updatePasswordRequest(
        @Context('user') { email }: IUserPayload,
        @Args('input') { password }: SignUpPasswordDto,
    ): Promise<boolean> {
        return await this.userService.updateUserPassword(email, password);
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

import { UsePipes, ValidationPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserDto } from '../dtos';
import { User, UserProfile } from '../entities';
//import { Company } from '@/modules/company/entities';
import { Role } from '@/modules/role/entities';
import { RoleService } from '@/modules/role/services';
import { RoleType } from '@/modules/role/enums';
import { UserService, ProfileService } from '../services';
//import { CompanyService } from '@/modules/company/services';
//import { RolesGuard } from '@/modules/auth/guards';
// import { Roles } from '@/modules/role/decorators';
//import { AuthGuard } from '@/modules/auth/guards/';
import { UserProfileInterceptor } from '../interceptors';

//@UseGuards(RolesGuard)
@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly profileService: ProfileService,
    ) {}
    //
    //private readonly companyService: CompanyService,

    //@UseGuards(AuthGuard)
    //@Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    //@UseGuards(AuthGuard)
    // @Query(() => User, { nullable: true })
    // async getUserData(@Context('user') user: User): Promise<User> {
    //     return this.userService.getUserById(user.id);
    // }

    //@Roles(RoleType.SUPERUSER, RoleType.ADMIN, RoleType.ADVISER)
    @Query(() => User, { nullable: true })
    async getUser(@Args('id') id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    @UseInterceptors(UserProfileInterceptor())
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async createUser(@Args('input') input: CreateUserDto): Promise<User> {
        return await this.userService.createUser(input);
    }

    // @UseGuards(AuthGuard)
    // @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User, { nullable: true })
    public async deleteUser(@Args('id') id: number): Promise<User> {
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

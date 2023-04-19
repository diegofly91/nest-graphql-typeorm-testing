import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { InputProfileUserDto } from '../dtos';
import { UserProfile, User } from '../entities';
import { ProfileService } from '../services';
import { AuthGuard, RolesGuard } from '@/modules/auth/guards';
import { RoleType } from '@/modules/role/enums';
import { Roles } from '@/modules/role/decorators';

@UseGuards(RolesGuard)
@Resolver(() => UserProfile)
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {}

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @Query(() => UserProfile, { nullable: true })
    async getProfileUserById(@Context('user') user: User): Promise<UserProfile> {
        return await this.profileService.getProfileUserById(user.id);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @Mutation(() => UserProfile)
    async updateProfileUser(
        @Context('user') user: User,
        @Args('input') input: InputProfileUserDto,
    ): Promise<UserProfile> {
        return await this.profileService.updateProfileUser(user.id, input);
    }
}

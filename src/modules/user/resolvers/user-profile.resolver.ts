import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { InputProfileUserDto } from '../dtos';
import { Profile } from '../entities';
import { ProfileService } from '../services';
import { AuthGuard, RolesGuard } from '@/modules/auth/guards';
import { RoleType } from '@/modules/role/enums';
import { Roles } from '@/modules/role/decorators';
import { IUserPayload } from '@/modules/auth/interfaces';

@UseGuards(RolesGuard)
@Resolver(() => Profile)
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {}

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @Query(() => Profile, { nullable: true })
    async getProfileUserById(@Context('user') user: IUserPayload): Promise<Profile> {
        return await this.profileService.getProfileUserById(user.id);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @Mutation(() => Profile)
    async updateProfileUser(
        @Context('user') { id }: IUserPayload,
        @Args('input') input: InputProfileUserDto,
    ): Promise<Profile> {
        return await this.profileService.updateProfileUser(id, input);
    }
}

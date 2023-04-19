import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../entities';
import { RoleService } from '../services';
import { RolesGuard } from '@/modules/auth/guards';
import { RoleType } from '@/modules/role/enums';
import { Roles } from '@/modules/role/decorators';

@UseGuards(RolesGuard)
@Resolver(() => Role)
export class RoleResolver {
    constructor(private readonly roleService: RoleService) {}

    @Roles(RoleType.SUPERUSER)
    @Query(() => [Role])
    async getRoles(): Promise<Role[]> {
        return this.roleService.getRoles();
    }

    @Roles(RoleType.SUPERUSER)
    @Query(() => Role, { nullable: false })
    async getRoleById(@Args('id') id: number): Promise<Role> {
        return this.roleService.getRoleById(id);
    }
}

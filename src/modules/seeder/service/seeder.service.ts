import { Injectable, Logger } from '@nestjs/common';
import { InputProfileUserDto, CreateUserDto } from '@/modules/user/dtos';
import { RoleService } from '@/modules/role/services';
import { ProfileService, UserService } from '@/modules/user/services';
import { rolesSeed, usersSeed } from '../data';
import { RoleType } from '@/modules/role/enums';
import { CreateRoleDto } from '@/modules/role/dtos';
import { User } from '@/modules/user/entities';
import { Role } from '@/modules/role/entities';

@Injectable()
export class SeederService {
    constructor(
        private readonly profileUserService: ProfileService,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly logger: Logger,
    ) {
        this.seed();
    }

    async seed() {
        await this.createRoles();
        await this.createUsers();
        return this.logger.debug('Successfuly completed seeding...');
    }

    async createRoles() {
        const roles = await this.roleService.getRoles();
        const rolesCreate: CreateRoleDto[] = rolesSeed
            .map((item) => {
                if (roles.find((role) => role.name === item.name)) return null;
                return item;
            })
            .filter((item) => item !== null);
        if (rolesCreate.length > 0) await this.roleService.createRoles(rolesCreate);
        return this.logger.debug('Successfuly completed seeding roles...');
    }

    async createUsers() {
        const roles: Role[] = await this.roleService.getRoles();
        await Promise.all(
            usersSeed.map(
                async (item: {
                    userDto: CreateUserDto;
                    profileDto: InputProfileUserDto;
                    roleName: keyof typeof RoleType;
                }) => {
                    const { userDto, profileDto, roleName } = item;
                    const role = roles.find((role) => role.name === roleName);
                    const exists = await this.userService.getUserByEmail(userDto.email);
                    if (exists === null) {
                        userDto.roleId = role.id;
                        const user: User = await this.userService.createUser(userDto);
                        await this.profileUserService.createProfileUser(user.id, profileDto);
                    }
                    this.logger.debug('Seeder User created: ' + userDto.email);
                },
            ),
        );
    }
}

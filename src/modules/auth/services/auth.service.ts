import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/user/services';
import { RoleService } from '@/modules/role/services';
import { IUserPayload, IAuthService, IToken } from '../interfaces';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly roleService: RoleService,
    ) {}

    async payloadData(email: string): Promise<IToken> {
        const { id, status, roleId } = await this.userService.getPasswordByEmail(email);
        const role = await this.roleService.getRoleById(roleId);

        const payload = {
            id,
            email,
            status,
            roleId,
            roleName: role.name,
        };

        return {
            access_token: this.jwtService.sign(payload),
            expirate_in: 3600,
        };
    }

    async userCurrentData(access_token: string): Promise<IUserPayload> {
        const token = access_token.replace('Bearer ', '');
        const user: IUserPayload = await this.jwtService.verify(token);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}

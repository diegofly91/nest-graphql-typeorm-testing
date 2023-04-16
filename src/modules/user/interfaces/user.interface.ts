import { IUserProfile } from './user-profile.interface';
import { IRole } from '@/modules/role/interfaces';

export class IUser {
    readonly id?: number;

    /**
     * User status ACTIVE | INACTIVE | default PREACTIVE
     */
    readonly status?: string;

    readonly roleId: number;

    readonly email: string;

    password: string;

    readonly createdAt?: string;

    readonly updatedAt?: string;

    profile?: IUserProfile;

    role?: IRole;
}

import { IProfile } from './user-profile.interface';
import { IRole } from '@/modules/role/interfaces';
import { Status } from '@/modules/shared/enums';

export interface IUser {
    readonly id?: number;

    /**
     * User status ACTIVE | INACTIVE | default PREACTIVE
     */
    readonly status?: keyof typeof Status;

    readonly roleId: number;

    readonly email: string;

    readonly password: string;

    readonly createdAt?: string;

    readonly updatedAt?: string;

    profile?: IProfile;

    role?: IRole;
}

//import { IProfile } from './profile.interface';

export class IUser {
    readonly id?: number;

    /**
     * User status ACTIVE | INACTIVE | default PREACTIVE
     */
    readonly status?: string;

    readonly roleId: number;

    password: string;

    readonly createdAt?: Date;

    readonly updatedAt?: Date;

    // profile?: IProfile;
}

import { Status } from '@/modules/shared/enums';

export interface IUserPayload {
    readonly id: number;

    readonly email: string;
    /**
     * User status ACTIVE | INACTIVE | default PREACTIVE
     */
    readonly status?: keyof typeof Status;

    readonly roleId: number;

    readonly roleName: string;
}

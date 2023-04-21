import { Status } from '@/modules/shared/enums';

export interface ICategory {
    readonly id: number;

    readonly name: string;

    readonly description: string;

    readonly picture?: string;

    readonly status: keyof typeof Status;

    readonly createdAt?: string;

    readonly updatedAt?: string;
}

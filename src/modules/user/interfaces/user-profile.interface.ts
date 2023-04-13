export class IUserProfile {
    readonly id: number;

    readonly userId: number;

    readonly firstname?: string;

    readonly lastname?: string;

    readonly phone?: string;

    readonly address?: string;

    readonly createdAt?: Date;

    readonly updatedAt?: Date;
}

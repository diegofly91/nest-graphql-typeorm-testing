export interface IProfile {
    readonly id: number;

    readonly userId: number;

    readonly documentTypeId?: number;

    readonly document?: string;

    readonly firstname?: string;

    readonly lastname?: string;

    readonly city?: string;

    readonly phone?: string;

    readonly address?: string;

    readonly createdAt?: string;

    readonly updatedAt?: string;
}

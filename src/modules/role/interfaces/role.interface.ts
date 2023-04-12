export interface IRole {
    /**
     * ID autoincrement from database.
     */
    readonly id?: number;

    /**
     * Name of Role
     */
    readonly name?: string;

    /**
     * Description of Role
     */
    readonly description?: string;

    readonly createdAt?: Date;

    readonly updatedAt?: Date;
}

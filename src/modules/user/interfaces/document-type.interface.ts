export interface IDocumentType {
    readonly id: number;
    readonly name: string;
    readonly abbreviation: string;
    readonly description?: string;
    readonly isActive: boolean;
    readonly required?: boolean;
    readonly deleted: boolean;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}

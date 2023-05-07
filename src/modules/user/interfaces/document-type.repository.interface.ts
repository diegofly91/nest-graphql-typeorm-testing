import { OptionDto } from '@/modules/shared/dtos';
import { InputDocumentType } from '../dtos';

export interface IDocumentTypeRepository<T> {
    getDocumentTypesAll(): Promise<T[]>;
    getDocumentTypes(option?: OptionDto): Promise<T[]>;
    getDocumentTypeById(id: number): Promise<T>;
    getDocumentTypeByName(name: string): Promise<T>;
    getDocumentTypeByAbbreviation(abbreviation: string): Promise<T>;
    createDocumentType(dto: InputDocumentType): Promise<T>;
    activeDocumentType(id: number, isActive: boolean): Promise<boolean>;
    updateDocumentType(id: number, dto: InputDocumentType): Promise<T>;
    deleteDocumentType(id: number): Promise<boolean>;
}

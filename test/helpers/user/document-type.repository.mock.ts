import { IDocumentTypeRepository } from '@/modules/user/interfaces';
import { docTypeMock } from './document-type.data.mock';
import { DocumentType, InputDocumentType } from '../../gql/queries';
import { OptionDto } from '@/modules/shared/dtos';

export class DocumentTypeRepositoryMock implements IDocumentTypeRepository<DocumentType> {
    async getDocumentTypesAll(): Promise<DocumentType[]> {
        return Promise.resolve(docTypeMock);
    }

    async getDocumentTypes(option?: OptionDto): Promise<DocumentType[]> {
        const { deleted, isActive } = option;
        const docs = docTypeMock.filter(
            (docType) => docType.deleted === Boolean(deleted) && docType.isActive === Boolean(isActive),
        );
        return Promise.resolve(docs);
    }

    async getDocumentTypeById(id: number): Promise<DocumentType> {
        return Promise.resolve(docTypeMock.find((docType) => docType.id === id));
    }

    getDocumentTypeByName(name: string): Promise<DocumentType> {
        return Promise.resolve(docTypeMock.find((docType) => docType.name.toLowerCase() === name.toLocaleLowerCase()));
    }

    getDocumentTypeByAbbreviation(abbreviation: string): Promise<DocumentType> {
        return Promise.resolve(
            docTypeMock.find((docType) => docType.abbreviation.toLowerCase() === abbreviation.toLocaleLowerCase()),
        );
    }

    async createDocumentType(dto: InputDocumentType): Promise<DocumentType> {
        const newDocType: DocumentType = {
            ...dto,
            id: docTypeMock.length + 1,
            deleted: false,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        };
        docTypeMock.push({ ...newDocType });
        return Promise.resolve(newDocType);
    }

    async updateDocumentType(id: number, input: InputDocumentType): Promise<DocumentType> {
        let updateDocType: DocumentType;
        docTypeMock.map((docType) => {
            if (docType.id === id) {
                updateDocType = { ...docType, ...input };
                return updateDocType;
            }
            return docType;
        });
        return Promise.resolve(updateDocType);
    }

    async activeDocumentType(id: number, isActive: boolean): Promise<boolean> {
        const docTypeUpdate = docTypeMock.find((docType) => docType.id === id);
        docTypeMock.map((docType) => {
            if (docType.id === id) return { ...docTypeUpdate, isActive };
            return docType;
        });
        return Promise.resolve(!!docTypeUpdate);
    }

    async deleteDocumentType(id: number): Promise<boolean> {
        const docTypeUpdate = docTypeMock.find((docType) => docType.id === id);
        docTypeMock.map((docType) => {
            if (docType.id === id) return { ...docTypeUpdate, deleted: true };
            return docType;
        });
        return Promise.resolve(!!docTypeUpdate);
    }
}

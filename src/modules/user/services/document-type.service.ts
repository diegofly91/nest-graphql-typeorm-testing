import { Injectable } from '@nestjs/common';
import { InputDocumentType } from '../dtos';
import { DocumentType } from '../entities';
import { DocumentTypeRepository } from '../repositories';
import { OptionDto } from '@/modules/shared/dtos';

@Injectable()
export class DocumentTypeService {
    constructor(private readonly docTypeRepository: DocumentTypeRepository) {}

    async getDocumentTypesAll(): Promise<DocumentType[]> {
        return await this.docTypeRepository.getDocumentTypesAll();
    }

    async getDocumentTypes(option?: OptionDto): Promise<DocumentType[]> {
        return await this.docTypeRepository.getDocumentTypes(option);
    }

    async getDocumentTypeById(id: number): Promise<DocumentType> {
        return await this.docTypeRepository.getDocumentTypeById(id);
    }

    async getDocumentTypeBypProfileId(profileId: number): Promise<DocumentType> {
        return await this.docTypeRepository.getDocumentTypeBypProfileId(profileId);
    }

    async createDocumentType(dto: InputDocumentType): Promise<DocumentType> {
        return await this.docTypeRepository.createDocumentType(dto);
    }

    async updateDocumentType(id: number, dto: InputDocumentType): Promise<DocumentType> {
        return await this.docTypeRepository.updateDocumentType(id, dto);
    }

    async activeDocumentType(id: number, isActive: boolean): Promise<boolean> {
        return await this.docTypeRepository.activeDocumentType(id, isActive);
    }

    async deleteDocumentType(id: number): Promise<boolean> {
        return await this.docTypeRepository.deleteDocumentType(id);
    }
}

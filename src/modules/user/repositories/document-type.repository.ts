import { InputDocumentType } from '../dtos';
import { DocumentType } from '../entities';
import { OptionDto } from '@/modules/shared/dtos';
import { IDocumentTypeRepository, IDocumentType } from '../interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentTypeRepository extends Repository<DocumentType> implements IDocumentTypeRepository<IDocumentType> {
    constructor(
        @InjectRepository(DocumentType)
        private readonly documentTypeRepository: Repository<DocumentType>,
    ) {
        super(documentTypeRepository.target, documentTypeRepository.manager, documentTypeRepository.queryRunner);
    }

    async getDocumentTypesAll(): Promise<DocumentType[]> {
        return await this.documentTypeRepository
            .createQueryBuilder('docType')
            .orderBy('docType.is_active', 'DESC')
            .addOrderBy('docType.deleted', 'ASC')
            .getMany();
    }

    async getDocumentTypes(option?: OptionDto): Promise<DocumentType[]> {
        const { deleted, isActive } = option;
        const documentTypes = await this.documentTypeRepository
            .createQueryBuilder('docType')
            .where('docType.deleted = :deleted AND docType.is_active = :isActive ', { deleted, isActive })
            .getMany();
        return documentTypes;
    }

    async getDocumentTypeById(id: number): Promise<DocumentType> {
        return await this.documentTypeRepository
            .createQueryBuilder('docType')
            .where('docType.id = :id ', { id })
            .getOne();
    }

    async getDocumentTypeByName(name: string): Promise<DocumentType> {
        return await this.documentTypeRepository
            .createQueryBuilder('docType')
            .where('LOWER(docType.name) = :name ', { name: name.toLowerCase() })
            .getOne();
    }

    async getDocumentTypeByAbbreviation(abbreviation: string): Promise<DocumentType> {
        return await this.documentTypeRepository
            .createQueryBuilder('docType')
            .where('LOWER(docType.abbreviation) = :abbreviation ', { abbreviation: abbreviation.toLowerCase() })
            .getOne();
    }

    async createDocumentType(dto: InputDocumentType): Promise<DocumentType> {
        let newDocumentType = new DocumentType();
        newDocumentType = Object.assign({}, newDocumentType, dto);
        const { raw } = await this.documentTypeRepository
            .createQueryBuilder()
            .insert()
            .into(DocumentType)
            .values(newDocumentType)
            .execute();
        return raw[0];
    }

    async activeDocumentType(id: number, isActive: boolean): Promise<boolean> {
        const documentType: DocumentType = await this.getDocumentTypeById(id);
        const companyToDocumentType = { ...documentType, isActive };
        const saved = await this.save(companyToDocumentType);
        return !!saved;
    }

    async updateDocumentType(id: number, dto: InputDocumentType): Promise<DocumentType> {
        const documentType = await this.getDocumentTypeById(id);
        const documentTypeToUpdate = Object.assign(documentType, dto);
        return await this.save(documentTypeToUpdate);
    }

    async deleteDocumentType(id: number): Promise<boolean> {
        const documentTypeDeleted = await this.createQueryBuilder()
            .update(DocumentType)
            .set({ deleted: true })
            .where('id = :id', { id })
            .execute();
        return !!documentTypeDeleted;
    }
}

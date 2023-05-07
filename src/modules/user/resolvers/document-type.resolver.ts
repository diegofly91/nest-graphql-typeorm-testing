import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputDocumentType } from '../dtos';
import { DocumentType } from '../entities';
import { DocumentTypeService } from '../services';
import { RolesGuard } from '../../auth/guards/';
import { RoleType } from '@/modules/role/enums';
import { Roles } from '@/modules/role/decorators';
import { OptionDto } from '@/modules/shared/dtos';
import { CreateDocTypeGuard, UpdateDocTypeGuard } from '../guards';

@UseGuards(RolesGuard)
@Resolver(() => DocumentType)
export class DocumentTypeResolver {
    constructor(private readonly serviceDocType: DocumentTypeService) {}
    @UsePipes(new ValidationPipe())
    @Query(() => [DocumentType])
    public async getDocumentTypesAll(): Promise<DocumentType[]> {
        return this.serviceDocType.getDocumentTypesAll();
    }

    @UsePipes(new ValidationPipe())
    @Query(() => [DocumentType])
    public async getDocumentTypes(@Args('input') input?: OptionDto): Promise<DocumentType[]> {
        return this.serviceDocType.getDocumentTypes(input);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @Query(() => DocumentType)
    public async getDocumentTypeById(@Args('id') id: number): Promise<DocumentType> {
        return this.serviceDocType.getDocumentTypeById(id);
    }

    @Roles(RoleType.SUPERUSER)
    @UseGuards(CreateDocTypeGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => DocumentType, { nullable: true })
    public async createDocumentType(@Args('input') input: InputDocumentType): Promise<DocumentType> {
        return await this.serviceDocType.createDocumentType(input);
    }

    @Roles(RoleType.SUPERUSER)
    @UsePipes(new ValidationPipe())
    @Mutation(() => DocumentType, { nullable: true })
    public async activeDocumentType(@Args('id') id: number, @Args('isActive') isActive: boolean): Promise<boolean> {
        return await this.serviceDocType.activeDocumentType(id, isActive);
    }

    @Roles(RoleType.SUPERUSER)
    @UseGuards(UpdateDocTypeGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => DocumentType)
    public async updateDocumentType(
        @Args('id') id: number,
        @Args('input') input: InputDocumentType,
    ): Promise<DocumentType> {
        return await this.serviceDocType.updateDocumentType(id, input);
    }

    @Roles(RoleType.SUPERUSER)
    @Mutation(() => DocumentType)
    public async deleteDocumentType(@Args('id') id: number): Promise<boolean> {
        return await this.serviceDocType.deleteDocumentType(id);
    }
}

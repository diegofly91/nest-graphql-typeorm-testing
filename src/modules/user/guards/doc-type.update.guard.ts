import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DocumentTypeService } from '../services';
import { InputDocumentType } from '../dtos';
import { MESSAGES } from '@/modules/shared/constants';

@Injectable()
export class UpdateDocTypeGuard implements CanActivate {
    constructor(private readonly docTypeService: DocumentTypeService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { name, abbreviation }: InputDocumentType = ctx.getArgs().input;
        const id = ctx.getArgs().id;
        const docTypeExist = await this.docTypeService.getDocumentTypeById(id);
        if (!docTypeExist) {
            throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.PRECONDITION_FAILED);
        }
        const docTypeExistName = await this.docTypeService.getDocumentTypeByName(name);
        if (!!docTypeExistName && docTypeExistName.id !== id) {
            throw new HttpException(`${MESSAGES.DOCUMENT_TYPE_EXIST} name: ${name}`, HttpStatus.PRECONDITION_FAILED);
        }
        const docTypeExistAbbreviation = await this.docTypeService.getDocumentTypeByAbbreviation(abbreviation);
        if (!!docTypeExistAbbreviation && docTypeExistAbbreviation.id !== id) {
            throw new HttpException(
                `${MESSAGES.DOCUMENT_TYPE_EXIST} abbreviation: ${abbreviation}`,
                HttpStatus.PRECONDITION_FAILED,
            );
        }

        return true;
    }
}

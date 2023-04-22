import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CategoryService } from '../services';
import { InputCategoryDto } from '../dtos';
import { MESSAGES } from '@/modules/shared/constants';

@Injectable()
export class CategoryCreateGuard implements CanActivate {
    constructor(private readonly categoryService: CategoryService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const input: InputCategoryDto = ctx.getArgs().input;
        const categorynameExists = await this.categoryService.getCategoryByName(input.name);
        if (!!categorynameExists) {
            throw new HttpException(MESSAGES.CATEGORY_NAME_EXIST, HttpStatus.PRECONDITION_FAILED);
        }
        return true;
    }
}

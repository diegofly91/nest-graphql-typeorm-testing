import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InputCategoryDto } from '../dtos';
import { Category } from '../entities';
import { RoleType } from '@/modules/role/enums';
import { CategoryService } from '../services';
import { RolesGuard } from '@/modules/auth/guards';
import { Roles } from '@/modules/role/decorators';
import { AuthGuard } from '@/modules/auth/guards/';

@UseGuards(RolesGuard)
@Resolver(() => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {}

    @Query(() => Category)
    async getCategory(@Args('id') id: number): Promise<Category> {
        return await this.categoryService.getCategoryById(id);
    }

    @Query(() => [Category], { nullable: true })
    async getCategories(): Promise<Category[]> {
        return await this.categoryService.getCategories();
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Category, { nullable: true })
    public async createCategory(@Args('input') input: InputCategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(input);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Category, { nullable: true })
    public async updateCategory(@Args('id') id: number, @Args('input') input: InputCategoryDto): Promise<Category> {
        return await this.categoryService.updateCategory(id, input);
    }

    @Roles(RoleType.SUPERUSER, RoleType.ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Category, { nullable: true })
    public async deleteCategory(@Args('id') id: number): Promise<Category> {
        return await this.categoryService.deleteCategory(id);
    }
}

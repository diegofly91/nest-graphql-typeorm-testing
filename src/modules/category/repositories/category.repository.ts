import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputCategoryDto } from '../dtos';
import { Category } from '../entities';
import { ICategoryRepository } from '../interfaces';
import { Status } from '@/modules/shared/enums';

@Injectable()
export class CategoryRepository<Category> implements ICategoryRepository<Category> {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async getCategoryById(id: number): Promise<Category> {
        return await this.categoryRepository.createQueryBuilder('category').where('category.id = :id', { id }).getOne();
    }

    async createCategory({ name, description, picture, status }: InputCategoryDto): Promise<Category> {
        const category = new Category();
        category.name = name;
        category.description = description;
        category.picture = picture;
        category.status = status;
        const { raw } = await this.categoryRepository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values(category)
            .execute();
        return raw[0];
    }

    async updateCategory(id: number, input: InputCategoryDto): Promise<Category> {
        const category = await this.getCategoryById(id);
        const updatedCategory = Object.assign(category, input);
        return await this.categoryRepository.save(updatedCategory);
    }

    async deleteCategory(id: number): Promise<Category> {
        const category: Category = await this.getCategoryById(id);
        const categoryUpdate = Object.assign(category, { status: Status.DELETED });
        return await this.categoryRepository.save(categoryUpdate);
    }
}

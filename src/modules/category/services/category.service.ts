import { Injectable, Inject } from '@nestjs/common';
import { Category } from '../entities';
import { CategoryRepository } from '../repositories';
import { InputCategoryDto } from '../dtos';

@Injectable()
export class CategoryService {
    constructor(
        @Inject('CategoryRepositoryInterface')
        private readonly userRepository: CategoryRepository<Category>,
    ) {}

    async getCategories(): Promise<Category[]> {
        return await this.userRepository.getCategories();
    }

    async getCategoryById(id: number): Promise<Category> {
        return await this.userRepository.getCategoryById(id);
    }

    async createCategory(input: InputCategoryDto): Promise<Category> {
        return await this.userRepository.createCategory(input);
    }

    async updateCategory(id: number, input: InputCategoryDto): Promise<Category> {
        return await this.userRepository.updateCategory(id, input);
    }

    async deleteCategory(id: number): Promise<Category> {
        return await this.userRepository.deleteCategory(id);
    }
}

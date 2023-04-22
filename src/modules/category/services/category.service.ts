import { Injectable } from '@nestjs/common';
import { Category } from '../entities';
import { CategoryRepository } from '../repositories';
import { InputCategoryDto } from '../dtos';

@Injectable()
export class CategoryService {
    constructor(private readonly userRepository: CategoryRepository) {}

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

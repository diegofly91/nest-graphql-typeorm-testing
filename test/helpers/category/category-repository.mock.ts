import { categoriesMock } from './categories.mock';
import { ICategoryRepository } from '@/modules/category/interfaces';
import { Category, Status, InputCategoryDto } from '../../gql/queries';

export class CategoryRepositoryMock implements ICategoryRepository<Category> {
    getAllCategories(): Promise<Category[]> {
        return Promise.resolve(categoriesMock);
    }

    getCategoryById(id: number): Promise<Category> {
        return Promise.resolve(categoriesMock.find((category) => category.id === id));
    }

    getCategoryByName(name: string): Promise<Category> {
        return Promise.resolve(categoriesMock.find((category) => category.name.toLowerCase() === name.toLowerCase()));
    }

    createCategory(input: InputCategoryDto): Promise<Category> {
        const newCategory = {
            ...input,
            id: categoriesMock.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        categoriesMock.push(newCategory);
        return Promise.resolve(newCategory);
    }

    updateCategory(id: number, input: InputCategoryDto): Promise<Category> {
        const category = categoriesMock.find((category) => category.id === id);
        const categoryUpdate = Object.assign(category, input);
        return Promise.resolve(categoryUpdate);
    }

    deleteCategory(id: number): Promise<Category> {
        const category = categoriesMock.find((category) => category.id === id);
        const updateCategory = Object.assign(category, { status: Status.Deleted });
        return Promise.resolve(updateCategory);
    }
}

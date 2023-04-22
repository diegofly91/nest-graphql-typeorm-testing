import { InputCategoryDto } from '@/modules/category/dtos';
import { categoriesMock } from './categories.mock';
import { ICategory, ICategoryRepository } from '@/modules/category/interfaces';
import { Status } from '@/modules/shared/enums';

export class CategoryRepositoryMock implements ICategoryRepository<ICategory> {
    getAllCategories(): Promise<ICategory[]> {
        return Promise.resolve(categoriesMock);
    }

    getCategoryById(id: number): Promise<ICategory> {
        return Promise.resolve(categoriesMock.find((category) => category.id === id));
    }

    getCategoryByName(name: string): Promise<ICategory> {
        return Promise.resolve(categoriesMock.find((category) => category.name.toLowerCase() === name.toLowerCase()));
    }

    createCategory(input: InputCategoryDto): Promise<ICategory> {
        return Promise.resolve({
            ...input,
            id: categoriesMock.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    }

    updateCategory(id: number, input: InputCategoryDto): Promise<ICategory> {
        const category = categoriesMock.find((category) => category.id === id);
        const categoryUpdate = Object.assign(category, input);
        return Promise.resolve(categoryUpdate);
    }

    deleteCategory(id: number): Promise<ICategory> {
        const category = categoriesMock.find((category) => category.id === id);
        const updateCategory = Object.assign(category, { status: Status.DELETED });
        return Promise.resolve(updateCategory);
    }
}

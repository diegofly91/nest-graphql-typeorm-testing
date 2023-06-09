import { InputCategoryDto } from '../dtos/input-category.dto';

export interface ICategoryRepository<ICategory> {
    getCategoryById(id: number): Promise<ICategory>;
    getAllCategories(): Promise<ICategory[]>;
    getCategoryByName(name: string): Promise<ICategory>;
    createCategory(input: InputCategoryDto): Promise<ICategory>;
    updateCategory(id: number, input: InputCategoryDto): Promise<ICategory>;
    deleteCategory(id: number): Promise<ICategory>;
}

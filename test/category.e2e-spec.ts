import { InputCategoryDto, Sdk, Status } from './gql/queries';
import { createTestingApp } from './common/test-setup';
import { categoriesMock } from './helpers/category';
import { usersMock } from './helpers/user';
import { MESSAGES } from '@/modules/shared/constants';

describe('CategoryResolver (e2e)', () => {
    let session: Sdk;
    let app: any;
    let access_token: string;

    beforeEach(async () => {
        const { sessionFactory, app: appInstance } = await createTestingApp();
        session = await sessionFactory.create();
        // user role SUPERUSER
        const { email, password } = usersMock[0];
        const { loginUser } = await session.loginUser({ input: { email, password } });
        access_token = loginUser.access_token;
        app = appInstance;
    });

    afterAll(async () => {
        await app.close();
    });

    describe('CategoryResolver Query  (e2e)', () => {
        it('should return all categories [{},{},..{}]', async () => {
            const { getAllCategories } = await session.getAllCategories();
            expect(getAllCategories.length).toBe(categoriesMock.length);
        });

        it('should return a category by id', async () => {
            const categoryResponse = categoriesMock[0];
            const { getCategoryById } = await session.getCategoryById({ id: categoryResponse.id });
            expect(getCategoryById).toEqual(categoryResponse);
        });
    });

    describe('CategoryResolver Mutation  (e2e)', () => {
        it('should create category return  Category', async () => {
            const input: InputCategoryDto = {
                name: 'Category 3',
                description: 'Description 3',
                picture: 'Picture 3',
                status: Status.Preactive,
            };

            const { createCategory } = await session.createCategory(
                { input },
                { Authorization: `Bearer ${access_token}` },
            );
            expect(createCategory).toEqual({
                id: expect.any(Number),
                name: input.name,
                description: input.description,
                picture: input.picture,
                status: input.status,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });

        it('should update category return  Category', async () => {
            const { id, name, description, picture } = categoriesMock[0];
            const input: InputCategoryDto = {
                name: `${name} updated`,
                description: `${description} updated`,
                picture: picture,
                status: Status.Preactive,
            };
            const { updateCategory } = await session.updateCategory(
                { id, input },
                { Authorization: `Bearer ${access_token}` },
            );
            expect(updateCategory).toEqual({
                id,
                ...input,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
        it('should delete category return  Category', async () => {
            const { id } = categoriesMock[0];
            const { deleteCategory } = await session.deleteCategory(
                { id },
                { Authorization: `Bearer ${access_token}` },
            );
            expect(deleteCategory).toEqual({
                id,
                name: expect.any(String),
                description: expect.any(String),
                picture: expect.any(String),
                status: Status.Deleted,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });
    describe('CategoryResolver Mutation Errors  (e2e)', () => {
        it('should create category return  Error Access', async () => {
            const input: InputCategoryDto = {
                name: 'Category 3',
                description: 'Description 3',
                picture: 'Picture 3',
                status: Status.Preactive,
            };
            //user role CUSTOMER
            const { email, password } = usersMock[3];
            const { loginUser } = await session.loginUser({ input: { email, password } });
            try {
                await session.createCategory({ input }, { Authorization: `Bearer ${loginUser.access_token}` });
            } catch ({ response }) {
                expect(response.errors[0].message).toBe(MESSAGES.UNAUTORIZATED_USER);
            }
        });

        it(`should create category return  Error ${MESSAGES.CATEGORY_NAME_EXIST}`, async () => {
            const { name } = categoriesMock[0];
            const input: InputCategoryDto = {
                name,
                description: 'Description 3',
                picture: 'Picture 3',
                status: Status.Preactive,
            };
            try {
                await session.createCategory({ input }, { Authorization: `Bearer ${access_token}` });
            } catch ({ response }) {
                expect(response.errors[0].message).toBe(MESSAGES.CATEGORY_NAME_EXIST);
            }
        });

        it(`should update category return  Error ${MESSAGES.CATEGORY_NAME_EXIST}`, async () => {
            // category name exist
            const { name } = categoriesMock[1];
            // category id to update
            const { id, description, picture } = categoriesMock[0];
            const input: InputCategoryDto = {
                name: name,
                description: `${description} updated`,
                picture: picture,
                status: Status.Preactive,
            };
            try {
                return await session.updateCategory({ id, input }, { Authorization: `Bearer ${access_token}` });
            } catch ({ response }) {
                expect(response.errors[0].message).toBe(MESSAGES.CATEGORY_NAME_EXIST);
            }
        });
    });
});

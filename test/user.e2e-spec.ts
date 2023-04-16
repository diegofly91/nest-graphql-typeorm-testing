import { Sdk, Status, CreateUserDto, InputProfileUserDto } from './gql/queries';
import { usersMock } from './helpers/user';
import { createTestingApp } from './common/test-setup';

describe('UserResolver (e2e)', () => {
    let session: Sdk;
    let app: any;

    const newUser: { input: CreateUserDto; inputPro: InputProfileUserDto } = {
        input: {
            email: 'diegofermamdolibres@gmail.com',
            roleId: 1,
            password: 'holamudno',
            status: Status.Active,
        },
        inputPro: {
            firstname: 'John',
            lastname: 'Doe',
            phone: '3204426066',
            address: 'Calle 123',
        },
    };

    beforeEach(async () => {
        const { sessionFactory, app: appInstance } = await createTestingApp();
        session = await sessionFactory.create();
        app = appInstance;
    });

    afterAll(async () => {
        await app.close();
    });

    describe('UserResolver Query  (e2e)', () => {
        it('should be defined', () => {
            expect(session).toBeDefined();
        });

        it('should return all users [{},{},..{}]', async () => {
            const { getUsers } = await session.getUsers();
            expect(getUsers.length).toBe(usersMock.length);
        });

        it('should return a user by id', async () => {
            const userResponse = usersMock[0];
            const { getUser } = await session.getUser({ id: userResponse.id });
            expect(getUser).toEqual({
                ...userResponse,
                profile: expect.any(Object),
                role: expect.any(Object),
            });
        });

        it('createUser return error Invalid MobilePhone Number', async () => {
            try {
                const { input, inputPro } = newUser;
                inputPro.phone = '123456789';
                await session.createUser({ input, inputPro });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain('Invalid MobilePhone Number');
                });
            }
        });

        it('createUser return error The Exits EMAIL', async () => {
            try {
                const { input, inputPro } = newUser;
                input.email = usersMock[0].email;
                await session.createUser({ input, inputPro });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain('The Exits EMAIL');
                });
            }
        });

        it('delete user by Id', async () => {
            const userResponse = usersMock[0];
            const { deleteUser } = await session.deleteUser({ id: userResponse.id });
            expect(deleteUser).toEqual({
                ...userResponse,
                status: Status.Deleted,
                profile: expect.any(Object),
                role: expect.any(Object),
            });
        });
    });
});

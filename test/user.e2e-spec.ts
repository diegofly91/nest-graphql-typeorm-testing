import { Sdk, Status, CreateUserDto, InputProfileUserDto } from './gql/queries';
import { usersMock } from './helpers/user';
import { createTestingApp } from './common/test-setup';
import { MESSAGES } from '@/modules/shared/constants';

describe('UserResolver (e2e)', () => {
    let session: Sdk;
    let app: any;
    let access_token: string;

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
        // user role SUPERUSER
        const { email, password } = usersMock[0];
        const { loginUser } = await session.loginUser({ input: { email, password } });
        access_token = loginUser.access_token;
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
            const { getUsers } = await session.getUsers({}, { Authorization: access_token });
            expect(getUsers.length).toBe(usersMock.length);
        });

        it(`getUsers query by user type CUSTOMER return Error ${MESSAGES.UNAUTORIZATED_USER} `, async () => {
            try {
                const { email, password } = usersMock[3];
                const { loginUser } = await session.loginUser({ input: { email, password } });
                return await session.getUsers({}, { Authorization: loginUser.access_token });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.UNAUTORIZATED_USER);
                });
            }
        });

        it('should return a user by id', async () => {
            const userResponse = usersMock[0];
            const { getUser } = await session.getUser({ id: userResponse.id }, { Authorization: access_token });
            expect(getUser).toEqual({
                ...userResponse,
                profile: expect.any(Object),
                role: expect.any(Object),
            });
        });

        it(`createUser return Error ${MESSAGES.INVALID_MOBILE}`, async () => {
            try {
                const { input, inputPro } = newUser;
                inputPro.phone = '123456789';
                await session.createUser({ input, inputPro });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.INVALID_MOBILE);
                });
            }
        });

        it(`createUser return Error ${MESSAGES.EMAIL_EXIST}`, async () => {
            try {
                const { input, inputPro } = newUser;
                input.email = usersMock[0].email;
                await session.createUser({ input, inputPro });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.EMAIL_EXIST);
                });
            }
        });

        it('delete user by Id', async () => {
            const userResponse = usersMock[0];
            const { deleteUser } = await session.deleteUser({ id: userResponse.id }, { Authorization: access_token });
            expect(deleteUser).toEqual({
                ...userResponse,
                status: Status.Deleted,
                profile: expect.any(Object),
                role: expect.any(Object),
            });
        });
    });
});

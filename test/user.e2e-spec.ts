import { Sdk, Status, CreateUserDto, InputProfileUserDto, SignUpPasswordDto } from './gql/queries';
import { usersMock } from './helpers/user';
import { createTestingApp } from './common/test-setup';
import { MESSAGES } from '@/modules/shared/constants';

describe('UserResolver (e2e)', () => {
    let session: Sdk;
    let app: any;
    let access_token: string;

    const newUser: { input: CreateUserDto; inputPro: InputProfileUserDto } = {
        input: {
            email: 'diego22@gmail.com',
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
    });

    describe('UserResolver Mutation Error (e2e)', () => {
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
                input.email = usersMock[1].email;
                await session.createUser({ input, inputPro });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.EMAIL_EXIST);
                });
            }
        });

        it('updateUserPassword ', async () => {
            const input: SignUpPasswordDto = {
                password: 'holamundo',
                passwordConfirm: 'holamundo',
            };
            const { updatePasswordRequest } = await session.updatePasswordRequest(
                { input },
                { Authorization: access_token },
            );
            expect(updatePasswordRequest).toEqual(true);
        });
    });
    describe('UserResolver Mutation Success (e2e)', () => {
        it('createUser return User', async () => {
            const { input, inputPro } = newUser;
            input.email = 'minuevo@gmail.com';
            inputPro.phone = '3204426066';
            const { createUser } = await session.createUser({ input, inputPro });
            expect(createUser).toEqual({
                id: expect.any(Number),
                ...input,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                profile: expect.any(Object),
                role: expect.any(Object),
            });
        });

        it('UpdateUserProfile return sucess', async () => {
            const { getUserData } = await session.getUserData({}, { Authorization: access_token });
            const { id, profile } = getUserData;
            const input: InputProfileUserDto = {
                firstname: 'Diego',
                address: 'Calle 123',
                lastname: 'Libreros',
                phone: '3204426065',
            };
            const { updateProfileUser } = await session.updateProfileUser({ input }, { Authorization: access_token });
            expect(updateProfileUser).toEqual({
                id: profile.id,
                userId: id,
                ...input,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
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

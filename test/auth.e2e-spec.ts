import { RegisterSocialDto, RoleType, Sdk, SocialProviders } from './gql/queries';
import { usersSocialMock } from './helpers/auth/users-social.mock';
import { createTestingApp } from './common/test-setup';
import { usersMock } from './helpers/user';
import { MESSAGES } from '@/modules/shared/constants';

describe('RoleResolver (e2e)', () => {
    let session: Sdk;
    let app: any;

    beforeEach(async () => {
        const { sessionFactory, app: appInstance } = await createTestingApp();
        session = await sessionFactory.create();
        app = appInstance;
    });

    afterAll(async () => {
        await app.close();
    });

    it('to Defined module Auth', async () => {
        expect(session).toBeDefined();
    });

    describe('RoleResolver Query  (e2e)', () => {
        it('userCurrentData return User', async () => {
            const { email, password } = usersMock[0];
            const { loginUser } = await session.loginUser({ input: { email, password } });
            const { userCurrentData } = await session.userCurrentData({}, { Authorization: loginUser.access_token });
            expect(userCurrentData).toEqual({
                id: expect.any(Number),
                email: expect.any(String),
                status: expect.any(String),
                roleId: expect.any(Number),
                roleName: expect.any(String),
            });
        });
    });

    describe('RoleResolver Mutation (e2e)', () => {
        it('loginUser return Token', async () => {
            const { email, password } = usersMock[0];
            const { loginUser } = await session.loginUser({ input: { email, password } });
            expect(loginUser).toEqual({
                access_token: expect.any(String),
                expirate_in: expect.any(Number),
            });
        });
        it(`loginUser return Error ${MESSAGES.LOGIN_DATA_ERROR}`, async () => {
            try {
                const { email } = usersMock[0];
                await session.loginUser({ input: { email, password: 'holamundo' } });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.LOGIN_DATA_ERROR);
                });
            }
        });

        it(`loginSocial return Error ${MESSAGES.LOGIN_SOCIAL_NOT_ACCEPTABLE}`, async () => {
            try {
                await session.loginSocial({ input: { accessToken: '', provider: SocialProviders.Google } });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.LOGIN_SOCIAL_NOT_ACCEPTABLE);
                });
            }
        });

        it(`loginSocial return Error ${MESSAGES.EMAIL_NOT_EXIST}`, async () => {
            try {
                const { input } = usersSocialMock[0];
                await session.loginSocial({ input });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.EMAIL_NOT_EXIST);
                });
            }
        });

        it(`loginSocial return success Token`, async () => {
            const { input } = usersSocialMock.find((item) => item.user.emails[0].value === usersMock[0].email);
            const { loginSocial } = await session.loginSocial({ input });
            expect(loginSocial).toEqual({
                access_token: expect.any(String),
                expirate_in: expect.any(Number),
            });
        });

        it(`registerSocial return success Token`, async () => {
            const { input } = usersSocialMock[0];
            const InputRegister: RegisterSocialDto = {
                ...input,
                roleType: RoleType.Adviser,
            };
            const { registerSocial } = await session.registerSocial({ input: InputRegister });
            expect(registerSocial).toEqual({
                access_token: expect.any(String),
                expirate_in: expect.any(Number),
            });
        });
    });
});

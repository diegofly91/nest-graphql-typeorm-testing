import { Sdk, SocialProviders } from './gql/queries';
import { createTestingApp } from './common/test-setup';
import { usersMock } from './helpers/user';
import { MESSAGES } from '@/modules/shared/constants';
import { usersSocialMock } from './helpers/auth/users-social.mock';

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

    describe('RoleResolver Query  (e2e)', () => {
        it('to Defined module Auth', async () => {
            expect(session).toBeDefined();
        });

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
    });
});

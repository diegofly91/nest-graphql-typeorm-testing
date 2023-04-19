import { Sdk } from './gql/queries';
import { createTestingApp } from './common/test-setup';
import { rolesMock } from './helpers/role';
import { usersMock } from './helpers/user';
import { MESSAGES } from '@/modules/shared/constants';

describe('RoleResolver (e2e)', () => {
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

    describe('RoleResolver Query  (e2e)', () => {
        it('should return all roles [{},{},..{}]', async () => {
            const { getRoles } = await session.getRoles({}, { Authorization: `Bearer ${access_token}` });
            expect(getRoles.length).toBe(rolesMock.length);
        });

        it('should return a role by id', async () => {
            const roleResponse = rolesMock[0];

            const { getRoleById } = await session.getRoleById(
                { id: roleResponse.id },
                { Authorization: `Bearer ${access_token}` },
            );
            expect(getRoleById).toEqual(roleResponse);
        });

        it('return error Inactorizated', async () => {
            try {
                // user type role CUSTOMER
                const { email, password } = usersMock[3];
                const { loginUser } = await session.loginUser({ input: { email, password } });
                await session.getRoles({}, { Authorization: `Bearer ${loginUser.access_token}` });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.UNAUTORIZATED_USER);
                });
            }
        });

        it('return error Inactorizated 2', async () => {
            try {
                // user type status != ACTIVE
                const { email, password } = usersMock[2];
                const { loginUser } = await session.loginUser({ input: { email, password } });
                await session.getRoles({}, { Authorization: `Bearer ${loginUser.access_token}` });
            } catch ({ response }) {
                response.errors.map((error) => {
                    expect(error.message).toContain(MESSAGES.USER_NOT_ACTIVE);
                });
            }
        });
    });
});

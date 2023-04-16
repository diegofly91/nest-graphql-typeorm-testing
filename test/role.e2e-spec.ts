import { Sdk } from './gql/queries';
import { createTestingApp } from './common/test-setup';
import { rolesMock } from './helpers/role';

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
        it('should return all roles [{},{},..{}]', async () => {
            const { getRoles } = await session.getRoles();
            expect(getRoles.length).toBe(rolesMock.length);
        });

        it('should return a role by id', async () => {
            const roleResponse = rolesMock[0];

            const { getRoleById } = await session.getRoleById({
                id: roleResponse.id,
            });
            expect(getRoleById).toEqual(roleResponse);
        });
    });
});

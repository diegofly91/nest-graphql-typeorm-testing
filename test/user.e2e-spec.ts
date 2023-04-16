import { Sdk } from './gql/queries';
import { usersMock } from './helpers/user';
import { createTestingApp } from './common/test-setup';

describe('UserResolver (e2e)', () => {
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
    });
});

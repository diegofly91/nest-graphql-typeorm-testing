import { Sdk } from './gql/queries';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SessionFactory } from './common/session-builder';
import { RoleRepositoryMock, rolesMock } from './helpers/role';
import { Role } from '../src/modules/role/entities/role.entity';
import { RoleModule } from '@/modules/role/role.module';
import { GraphQL } from '../src/graphql/graphql.module';
import { ConfigModule } from '@nestjs/config';

describe('RoleResolver (e2e)', () => {
    let session: Sdk;
    let app: any;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [RoleModule, GraphQL, ConfigModule.forRoot({ isGlobal: true })],
        })
            .overrideProvider(getRepositoryToken(Role))
            .useClass(RoleRepositoryMock)
            .overrideProvider('RoleRepositoryInterface')
            .useClass(RoleRepositoryMock)
            .compile();

        app = moduleFixture.createNestApplication();
        const sessionFactory = new SessionFactory(app);

        await app.init();
        session = await sessionFactory.create();
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

import { Test } from '@nestjs/testing';
import { UserModule } from '@/modules/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserProfile } from '@/modules/user/entities';
import { Role } from '@/modules/role/entities/role.entity';
import { UserProfileRepositoryMock, UserRepositoryMock } from '../helpers/user';
import { RoleRepositoryMock } from '../helpers/role';
import { SessionFactory } from './session-builder';
import { GraphQL } from '../../src/configurations/graphql/graphql.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from '@/modules/role/role.module';
import { LoginValidateGuardMock } from '../helpers/auth';
import { LoginValidateGuard } from '@/modules/auth/guards';
import { AuthModule } from '@/modules/auth/auth.module';

export const createTestingApp = async () => {
    const moduleFixture = await Test.createTestingModule({
        imports: [UserModule, RoleModule, AuthModule, GraphQL, ConfigModule.forRoot({ isGlobal: true })],
    })
        .overrideGuard(LoginValidateGuard)
        .useClass(LoginValidateGuardMock)
        .overrideProvider(getRepositoryToken(User))
        .useClass(UserRepositoryMock)
        .overrideProvider('UserRepositoryInterface')
        .useClass(UserRepositoryMock)
        .overrideProvider(getRepositoryToken(UserProfile))
        .useClass(UserProfileRepositoryMock)
        .overrideProvider('ProfileRepositoryInterface')
        .useClass(UserProfileRepositoryMock)
        .overrideProvider(getRepositoryToken(Role))
        .useClass(RoleRepositoryMock)
        .overrideProvider('RoleRepositoryInterface')
        .useClass(RoleRepositoryMock)
        .compile();

    const app = moduleFixture.createNestApplication();
    const sessionFactory = new SessionFactory(app);
    await app.init();

    return { sessionFactory, app };
};

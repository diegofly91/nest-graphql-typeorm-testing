import { Test } from '@nestjs/testing';
import { ProfileRepositoryMock, UserRepositoryMock, DocumentTypeRepositoryMock } from '../helpers/user';
import { LocalAuthGuardMock, SocialAuthGuardMock } from '../helpers/auth';
import { LocalAuthGuard, SocialAuthGuard } from '@/modules/auth/guards';
import { CategoryRepositoryMock } from '../helpers/category';
import { RoleRepositoryMock } from '../helpers/role';
import { UserModule } from '@/modules/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, Profile, DocumentType } from '@/modules/user/entities';
import { Role } from '@/modules/role/entities/role.entity';
import { SessionFactory } from './session-builder';
import { GraphQL } from '../../src/configurations/graphql/graphql.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from '@/modules/role/role.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { CategoryModule } from '@/modules/category/category.module';
import { Category } from '@/modules/category/entities';
import { RoleRepository } from '@/modules/role/repositories';
import { DocumentTypeRepository, ProfileRepository, UserRepository } from '@/modules/user/repositories';
import { CategoryRepository } from '@/modules/category/repositories';

export const createTestingApp = async () => {
    const moduleFixture = await Test.createTestingModule({
        imports: [
            UserModule,
            RoleModule,
            AuthModule,
            CategoryModule,
            GraphQL,
            ConfigModule.forRoot({ isGlobal: true }),
        ],
    })
        // overrideProvider User
        .overrideProvider(getRepositoryToken(User))
        .useClass(User)
        .overrideProvider(UserRepository)
        .useClass(UserRepositoryMock)
        // overrideProvider Profile
        .overrideProvider(getRepositoryToken(Profile))
        .useClass(Profile)
        .overrideProvider(ProfileRepository)
        .useClass(ProfileRepositoryMock)
        // overrideProvider DocumentType
        .overrideProvider(getRepositoryToken(DocumentType))
        .useClass(DocumentType)
        .overrideProvider(DocumentTypeRepository)
        .useClass(DocumentTypeRepositoryMock)
        // overrirdeProvider Role
        .overrideProvider(getRepositoryToken(Role))
        .useClass(Role)
        .overrideProvider(RoleRepository)
        .useClass(RoleRepositoryMock)
        // overrideProvider Category
        .overrideProvider(getRepositoryToken(Category))
        .useClass(Category)
        .overrideProvider(CategoryRepository)
        .useClass(CategoryRepositoryMock)
        // overrideProvider LocalAuthGuard Auth Module
        .overrideGuard(LocalAuthGuard)
        .useClass(LocalAuthGuardMock)
        // overrideProvider CustomAuthGuard Auth Module
        .overrideGuard(SocialAuthGuard)
        .useClass(SocialAuthGuardMock)
        .compile();

    const app = moduleFixture.createNestApplication();
    const sessionFactory = new SessionFactory(app);
    await app.init();

    return { sessionFactory, app };
};

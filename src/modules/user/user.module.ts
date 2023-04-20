import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, ProfileRepository /* UserCompanyRepository */ } from './repositories';
import { UserResolver, ProfileResolver /* UserCompanyResolver*/ } from './resolvers';
import { UserService, ProfileService /* , UserCompanyService */ } from './services';
import { User, UserProfile /*, , UserCompany */ } from './entities';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User, UserProfile])],
    providers: [
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository,
        },
        {
            provide: 'ProfileRepositoryInterface',
            useClass: ProfileRepository,
        },
        UserService,
        ProfileService,
        UserResolver,
        ProfileResolver,
    ],
    exports: [UserService, ProfileService],
})
export class UserModule {}

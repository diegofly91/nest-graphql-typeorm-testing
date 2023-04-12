import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository /*, ProfileRepository, UserCompanyRepository */ } from './repositories';
import { UserResolver /* ProfileResolver, UserCompanyResolver*/ } from './resolvers';
import { UserService /*, ProfileService, UserCompanyService */ } from './services';
// import { AuthModule } from '../auth';
import { User /*, Profile, UserCompany */ } from './entities';
// import { CompanyModule } from '../company';
import { RoleModule } from '../role/role.module';

@Module({
    imports: [
        // forwardRef(() => AuthModule),
        // forwardRef(() => CompanyModule),
        forwardRef(() => RoleModule),
        TypeOrmModule.forFeature([User /*, UserCompany, Profile*/]),
    ],
    providers: [
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository,
        },
        // {
        //     provide: 'UserCompanyRepositoryInterface',
        //     useClass: UserCompanyRepository,
        // },
        // {
        //     provide: 'ProfileRepositoryInterface',
        //     useClass: ProfileRepository,
        // },
        UserService,
        // UserCompanyService,
        // ProfileService,
        // UserCompanyResolver,
        UserResolver,
        // ProfileResolver,
    ],
    exports: [UserService /*, ProfileService, UserCompanyService */],
})
export class UserModule {}

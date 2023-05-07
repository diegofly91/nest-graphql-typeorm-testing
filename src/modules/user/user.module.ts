import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, ProfileRepository /* UserCompanyRepository */ } from './repositories';
import { UserResolver, ProfileResolver /* UserCompanyResolver*/ } from './resolvers';
import { UserService, ProfileService /* , UserCompanyService */ } from './services';
import { User, Profile /*, , UserCompany */ } from './entities';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    providers: [UserRepository, ProfileRepository, UserService, ProfileService, UserResolver, ProfileResolver],
    exports: [UserService, ProfileService],
})
export class UserModule {}

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, ProfileRepository, DocumentTypeRepository } from './repositories';
import { UserResolver, ProfileResolver, DocumentTypeResolver } from './resolvers';
import { UserService, ProfileService, DocumentTypeService } from './services';
import { User, Profile, DocumentType } from './entities';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User, Profile, DocumentType])],
    providers: [
        UserRepository,
        ProfileRepository,
        DocumentTypeRepository,
        UserService,
        ProfileService,
        DocumentTypeService,
        UserResolver,
        ProfileResolver,
        DocumentTypeResolver,
    ],
    exports: [UserService, ProfileService, DocumentTypeService],
})
export class UserModule {}

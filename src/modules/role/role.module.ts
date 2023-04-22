import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repositories';
import { RoleResolver } from './resolvers';
import { RoleService } from './services';
import { Role } from './entities';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RoleService, RoleResolver, RoleRepository],
    exports: [RoleService, RoleRepository],
})
export class RoleModule {}

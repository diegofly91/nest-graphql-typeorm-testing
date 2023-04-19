import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repositories';
import { RoleResolver } from './resolvers';
import { RoleService } from './services';
import { Role } from './entities';

@Module({
    imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Role])],
    providers: [
        RoleService,
        RoleResolver,
        {
            provide: 'RoleRepositoryInterface',
            useClass: RoleRepository,
        },
    ],
    exports: [RoleService],
})
export class RoleModule {}

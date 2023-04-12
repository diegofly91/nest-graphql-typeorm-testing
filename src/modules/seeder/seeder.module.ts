import { Module, forwardRef, Logger } from '@nestjs/common';
import { SeederService } from './service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
    imports: [forwardRef(() => UserModule), forwardRef(() => RoleModule)],
    providers: [SeederService, Logger],
    exports: [SeederService],
})
export class SeederModule {}

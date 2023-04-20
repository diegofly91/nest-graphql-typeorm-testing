import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.service';

@Global()
@Module({
    imports: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQL } from './graphql';
import { DatabaseModule } from './database';
import { RoleModule } from './modules/role/role.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, GraphQL, RoleModule, UserModule, SeederModule],
    providers: [],
})
export class AppModule {
    static host: string;
    static port: number;

    constructor(private readonly configService: ConfigService) {
        AppModule.host = this.configService.get('HOST');
        AppModule.port = +this.configService.get('PORT');
    }
}

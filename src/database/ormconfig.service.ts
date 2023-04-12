import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
    /**
     * Método que obtém as configurações para o Typeorm
     */
    public createTypeOrmOptions(): TypeOrmModuleOptions {
        let options: TypeOrmModuleOptions = {
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            acquireTimeout: 60000,
            migrationsRun: !!process.env.DATABASE_AUTOLOADENTITIES,
            synchronize: !!process.env.DATABASE_AUTOLOADENTITIES,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + process.env.DATABASE_MIGRATIONS_DIR + '/*.{.ts,.js}'],
        };

        if (process.env.DB_TYPE === 'mysql') {
            options = Object.assign(options, {
                type: 'mysql',
                charset: 'utf8mb4',
                collation: 'utf8mb4_unicode_ci',
                port: process.env.DATABASE_PORT,
            });
        }
        if (process.env.DB_TYPE === 'postgres') {
            options = Object.assign(options, {
                type: 'postgres',
                charset: 'utf8mb4',
                collation: 'utf8mb4_unicode_ci',
                timezone: process.env.DATABASE_TIMEZONE,
                keepConnectionAlive: true,
                port: process.env.DATABASE_PORT,
                cli: {
                    migrationsDir: __dirname + process.env.DATABASE_MIGRATIONS_DIR + 'postgrest',
                },
            });
        }

        return options;
    }
}

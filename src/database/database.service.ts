import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmService } from './ormconfig.service';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        useFactory: async () => await new TypeOrmService().createTypeOrmOptions(),
        dataSourceFactory: async (options) => {
            const dataSource = await new DataSource(options).initialize();
            return dataSource;
        },
    }),
];

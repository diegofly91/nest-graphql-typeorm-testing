import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories';
import { CategoryResolver } from './resolvers';
import { CategoryService } from './services';
import { Category } from './entities';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService, CategoryResolver, CategoryRepository],
    exports: [CategoryService],
})
export class CategoryModule {}

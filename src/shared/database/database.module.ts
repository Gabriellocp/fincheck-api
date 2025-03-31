import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories.repositories';
import { UserRepository } from './repositories/users.repositories';

@Global()
@Module({
    providers: [PrismaService, UserRepository, CategoriesRepository],
    exports: [UserRepository, CategoriesRepository]
})
export class DatabaseModule { }

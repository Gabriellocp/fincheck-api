import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountRepository } from './repositories/bank-accounts.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { UserRepository } from './repositories/users.repositories';

@Global()
@Module({
    providers: [PrismaService, UserRepository, CategoriesRepository, BankAccountRepository],
    exports: [UserRepository, CategoriesRepository, BankAccountRepository]
})
export class DatabaseModule { }

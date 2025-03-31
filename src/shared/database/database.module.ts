import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountRepository } from './repositories/bank-accounts.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { TransactionsRepository } from './repositories/transactions.repositories';
import { UserRepository } from './repositories/users.repositories';

@Global()
@Module({
    providers: [PrismaService, UserRepository, CategoriesRepository, BankAccountRepository, TransactionsRepository],
    exports: [UserRepository, CategoriesRepository, BankAccountRepository, TransactionsRepository]
})
export class DatabaseModule { }

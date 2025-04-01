import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValdiateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoriesOwnershipService } from '../../categories/services/validate-categories-ownership.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionType } from '../entities/Transaction';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnership: ValdiateBankAccountOwnershipService,
    private readonly validateCategoryOwnership: ValidateCategoriesOwnershipService,
    private readonly validateTransactionOwnership: ValidateTransactionOwnershipService,
  ) { }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId } = createTransactionDto

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId })
    return this.transactionsRepo.create(userId, createTransactionDto)
  }

  findAllByUserId(userId: string, filters: { month: number, year: number, bankAccountId?: string, type?: TransactionType }) {
    const { month, year, bankAccountId, type } = filters
    return this.transactionsRepo.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(year, month)),
          lt: new Date(Date.UTC(year, month + 1))
        },
        bankAccountId,
        type
      }
    })
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId } = updateTransactionDto
    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId, transactionId })

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: updateTransactionDto
    })

  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId })
    await this.transactionsRepo.delete({
      where: { id: transactionId }
    })
    return null
  }



  private async validateEntitiesOwnership({ userId, bankAccountId, categoryId, transactionId }: { userId: string, bankAccountId?: string, categoryId?: string, transactionId?: string }) {
    bankAccountId && await this.validateBankAccountOwnership.validate(userId, bankAccountId)
    categoryId && await this.validateCategoryOwnership.validate(userId, categoryId)
    transactionId && await this.validateTransactionOwnership.validate(userId, transactionId)

  }
}

import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValdiateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountsRepo: BankAccountRepository,
    private readonly validateBankAccountOwnershipService: ValdiateBankAccountOwnershipService

  ) { }

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsRepo.create(userId, createBankAccountDto)
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepo.findMany({
      where: { userId }
    })
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId)
    return await this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: updateBankAccountDto
    })
  }


  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId)
    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId }
    })
    return null
  }


}

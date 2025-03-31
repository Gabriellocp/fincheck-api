import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValdiateBankAccountOwnershipService {
    constructor(private readonly bankAccountsRepo: BankAccountRepository) { }
    async validate(userId: string, bankAccountId: string) {
        const isOwner = await this.bankAccountsRepo.findFirst({
            where: {
                AND: [
                    { userId },
                    { id: bankAccountId }
                ]
            }
        })
        if (!isOwner) {
            throw new NotFoundException("Bank account not found")
        }
    }
}

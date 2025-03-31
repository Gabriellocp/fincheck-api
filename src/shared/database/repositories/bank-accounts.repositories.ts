import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateBankAccountDto } from "src/modules/bank-accounts/dto/create-bank-account.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class BankAccountRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(userId: string, createDto: CreateBankAccountDto) {
        return this.prismaService.bankAccount.create({
            data: {
                ...createDto,
                userId
            }
        })
    }

    findMany(findManyDto: Prisma.BankAccountFindManyArgs) {
        return this.prismaService.bankAccount.findMany(findManyDto)
    }

    findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs) {
        return this.prismaService.bankAccount.findFirst(findFirstDto)
    }

    update(updateDto: Prisma.BankAccountUpdateArgs) {
        return this.prismaService.bankAccount.update(updateDto)
    }
    delete(deleteDto: Prisma.BankAccountDeleteArgs) {
        return this.prismaService.bankAccount.delete(deleteDto)
    }
}

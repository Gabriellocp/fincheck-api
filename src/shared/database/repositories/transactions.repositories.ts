import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateTransactionDto } from "src/modules/transactions/dto/create-transaction.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class TransactionsRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async create(userId: string, transactionDto: CreateTransactionDto) {
        const { bankAccountId } = transactionDto
        return this.prismaService.transaction.create({
            data: {
                ...transactionDto,
                bankAccountId,
                userId
            }
        })
    }

    findMany(findManyDto: Prisma.TransactionFindManyArgs) {
        return this.prismaService.transaction.findMany(findManyDto)
    }

    findFirst(findFirstDto: Prisma.TransactionFindFirstArgs) {
        return this.prismaService.transaction.findFirst(findFirstDto)
    }

    update(updateDto: Prisma.TransactionUpdateArgs) {
        return this.prismaService.transaction.update(updateDto)
    }
    delete(deleteDto: Prisma.TransactionDeleteArgs) {
        return this.prismaService.transaction.delete(deleteDto)
    }
}

import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prismaService: PrismaService) { }
    findAllByUserId(id: string) {
        return this.prismaService.category.findMany({
            where: { userId: id }
        })
    }
    findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
        return this.prismaService.category.findFirst(findFirstDto)
    }
}


import { Injectable } from "@nestjs/common";
import { type Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
@Injectable()
export class UserRepository {

    constructor(private readonly prismaService: PrismaService) { }
    create(createDto: Prisma.UserCreateArgs) {
        return this.prismaService.user.create(createDto)
    }
    findByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: { email }
        })
    }
    findById(id: string) {
        return this.prismaService.user.findUnique({
            where: { id }
        })
    }
}
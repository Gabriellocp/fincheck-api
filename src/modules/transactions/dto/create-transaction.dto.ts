import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";
import { TransactionType } from "../entities/Transaction";

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    bankAccountId: string;

    @IsUUID()
    @IsString()
    categoryId: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    value: number;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsEnum(TransactionType)
    @IsNotEmpty()
    type: TransactionType;
}

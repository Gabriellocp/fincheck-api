import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './services/categories.service';
import { ValidateCategoriesOwnershipService } from './services/validate-categories-ownership.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoriesOwnershipService],
  exports: [ValidateCategoriesOwnershipService]
})
export class CategoriesModule { }

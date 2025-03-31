import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) { }

  async findAllByUserId(id: string) {
    return await this.categoriesRepo.findAllByUserId(id);
  }

}

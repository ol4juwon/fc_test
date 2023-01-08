import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './model/category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private catModel) {}
  /**
   * create addon category
   * @param createCategoryDto typeof CreateCategoryDto
   * @returns error | data object
   */
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const response = await this.catModel.query().insert(createCategoryDto);
      return { data: response };
    } catch (error) {
      return { error };
    }
  }
}

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
      const exist = await this.catModel.query().select().where({
        name: createCategoryDto.name,
        brands_id: createCategoryDto.brands_id,
      });
      console.log('exists', exist[0]);
      if (exist[0]) return { error: 'category for brand already exist' };
      const response = await this.catModel.query().insert(createCategoryDto);
      return { data: response };
    } catch (error) {
      return { error };
    }
  }
}

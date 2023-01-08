import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { AddonsService } from 'src/addons/addons.service';
import { CreateAddonDto } from 'src/addons/dto/create-addon.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { RemoveAddon, updateAddon } from 'src/types';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './model/brand.model';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);
  constructor(
    @InjectModel(Brand) private readonly brandModel,
    private addonService: AddonsService,
    private categoryService: CategoryService,
  ) {}

  /**
   *Create addons on brand
   * @param createAddonDTO
   * @returns data | error
   */
  async createAddons(createAddonDTO: CreateAddonDto) {
    try {
      const { error, data } = await this.addonService.create(createAddonDTO);
      if (error) return { error };
      return { data: data };
    } catch (error) {
      console.log('eree', error);
      return { error: error };
    }
  }

  /**
   * create addon category
   * @param createCategoryDto typeof CreateCategoryDto
   */
  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const { error, data } = await this.categoryService.create(
        createCategoryDto,
      );
      if (error) return { error };
      return { data };
    } catch (error) {
      return { error };
    }
  }
  /**
   * get all addons with optional filters
   * @param query : queryType
   * @returns error | data object
   */
  async getAddons(query: any) {
    try {
      const { error, data } = await this.addonService.getAddons(query);
      this.logger.debug(error);
      if (error) return { error };
      return { data: data };
    } catch (error) {
      return { error: error };
    }
  }

  /**
   * get a single addon by brands
   * @param payload
   * @returns error | data addon object
   */
  async getAddon(payload: { brandId: number; addonId: number }) {
    try {
      const response = await this.addonService.getAddon(payload);
      if (response.error) return { error: response.error };
      return { data: response.data };
    } catch (error) {
      return { error: error };
    }
  }

  /**
   *Create brands
   * @param createBrandDto
   * @returns data | error
   */
  async create(createBrandDto: CreateBrandDto) {
    try {
      console.log(createBrandDto);
      const response = await this.brandModel.query().insert(createBrandDto);
      return { data: response };
    } catch (error) {
      console.log(error);
      return { error: error.message || error.nativeError || error };
    }
  }

  /**
   * find all brands with optional query
   * @param param0
   * @returns
   */
  async findAll({ limit = 1, page = 1, sortBy = 'name', order = 'DESC' }) {
    try {
      const response = await this.brandModel.query().select(['*']);
      return { data: response };
    } catch (error) {
      return { error };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      console.log(updateBrandDto);
      const response = await this.brandModel
        .query()
        .update(updateBrandDto)
        .where({ id: +id });
      console.log(response);
      return { data: response };
    } catch (error) {
      console.log(error);
      return { error: error.message || error.nativeError || error };
    }
  }
  async updateAddons(payload: updateAddon) {
    try {
      this.logger.debug(payload);
      const response = await this.addonService.update(
        payload.addonId,
        payload.brands_id,
        payload,
      );
      console.log(response);
      if (response.error) return { error: response.error };
      return { data: response.data };
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  }

  async removeAddon(payload: RemoveAddon) {
    try {
      this.logger.debug(payload);
      const { error, data } = await this.addonService.remove(payload);
      console.log(error, data);
      if (error) return { error: error };
      return { data: data };
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  }
  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}

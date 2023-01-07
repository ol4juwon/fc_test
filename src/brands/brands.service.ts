import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { AddonsService } from 'src/addons/addons.service';
import { CreateAddonDto } from 'src/addons/dto/create-addon.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './model/brand.model';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand) private readonly brandModel,
    private addonService: AddonsService,
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

  async getAddons(payload: any) {
    try {
      const response = await this.addonService.getAddons(payload);
      console.log(response);
      return { data: response };
    } catch (error) {
      return { error: error };
    }
  }

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

  findAll() {
    return `This action returns all brands`;
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

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}

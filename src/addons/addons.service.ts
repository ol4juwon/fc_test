import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { queryType } from 'src/types';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { Addon } from './model/addon.model';

@Injectable()
export class AddonsService {
  constructor(@InjectModel(Addon) private addonModel) {}
  async create(createAddonDto: CreateAddonDto) {
    try {
      // console.log(createAddonDto);
      const response = await this.addonModel.query().insert(createAddonDto);
      console.log('response', response);
      response.category = response.category.join(', ');
      return { data: response };
    } catch (error) {
      console.log(error.nativeError.sqlMessage, error.message);
      return {
        error:
          error.nativeError.sqlMessage ||
          error.message ||
          error.nativeError ||
          error.message ||
          error,
      };
    }
  }

  /**
   *
   * @param param0 : queryType
   * @returns data | Error
   */
  async getAddons({
    id,
    query: { limit = 1, page = 1, sortBy = 'name', order = 'DESC' },
    addonId,
  }: queryType) {
    try {
      const q: any = { brands_id: id };
      if (addonId) q.id = addonId;
      const response = await this.addonModel
        .query()
        .select()
        .where(q)
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(sortBy, order);
      if (response.error) return { error: response.error };
      return { data: response };
    } catch (error) {
      return { error: error };
    }
  }
  async getAddon({ brandId, addonId }) {
    try {
      if (isNaN(brandId))
        throw new UnprocessableEntityException('Please supply a valid brandid');
      if (isNaN(addonId))
        throw new UnprocessableEntityException('Please supply a valid addonid');
      const q = { brands_id: brandId, id: addonId };
      const response = await this.addonModel.query().select().where(q);
      if (response.error) return { error: response.error };
      if (!response[0]) throw new NotFoundException('Addon not found');
      return { data: response };
    } catch (error) {
      return {
        error: error.response || error.error || error,
      };
    }
  }

  findAll() {
    return `This action returns all addons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addon`;
  }

  update(id: number, updateAddonDto: UpdateAddonDto) {
    return `This action updates a #${id} addon`;
  }

  remove(id: number) {
    return `This action removes a #${id} addon`;
  }
}

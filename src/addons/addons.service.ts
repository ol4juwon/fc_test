import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { queryType, RemoveAddon, updateAddon } from 'src/types';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { Addon } from './model/addon.model';

@Injectable()
export class AddonsService {
  private readonly logger = new Logger(AddonsService.name);
  constructor(@InjectModel(Addon) private addonModel) {}
  async create(createAddonDto: CreateAddonDto) {
    try {
      // console.log(createAddonDto);
      this.logger.debug(createAddonDto);
      const response = await this.addonModel.query().insert(createAddonDto);
      console.log('response', response);
      return { data: response };
    } catch (error) {
      console.log(
        error?.nativeError?.detail,
        Object.keys(error),
        error?.nativeError?.sqlMessage,
      );
      return {
        error:
          error?.nativeError?.detail ||
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
  }: queryType) {
    try {
      const q: any = { brands_id: id };
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

  async update(id: number, brands_id: number, updateAddonDto: updateAddon) {
    this.logger.debug('e', `${updateAddonDto.payload}`);
    try {
      // const payload = {}
      const response = await this.addonModel
        .query()
        .select('*')
        .update(updateAddonDto.payload)
        .where({ id: id, brands_id });
      this.logger.debug('dd', `${response}`);
      if (response != 1) throw new UnprocessableEntityException();
      return { data: response };
    } catch (error) {
      return { error: error.response || error.nativeError || error };
    }
  }

  async remove({ brandId, addonId }: RemoveAddon) {
    try {
      const response = await this.addonModel
        .query()
        .delete()
        .where({ brands_id: brandId, id: addonId });
      console.log('lo', response);
      if (response == 0) throw new BadRequestException('Addon not found');
      if (response) return { data: response };
    } catch (error) {
      return { error: error.response || error };
    }
  }
}

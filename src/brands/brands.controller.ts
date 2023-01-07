import {
  Controller,
  Get,
  Post,
  Body,
  Response,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { CreateAddonDto } from 'src/addons/dto/create-addon.dto';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post(':brandId/addons')
  async createAddon(
    @Response() res: any,
    @Param('brandId') id: number,
    @Body() createAddonDto: CreateAddonDto,
  ) {
    try {
      createAddonDto.brands_id = +id;
      const { error, data } = await this.brandsService.createAddons(
        createAddonDto,
      );
      if (error) return res.status(HttpStatus.BAD_REQUEST).send({ error });
      return res.status(HttpStatus.CREATED).send({ data });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_GATEWAY).send({ error });
    }
  }
  @Get(':brandId/addons')
  async getAddons(
    @Response() res: any,
    @Query() query,
    @Param('brandId') id: number,
  ) {
    try {
      const payload = { id: id, query };
      const { error, data } = await this.brandsService.getAddons(payload);
      if (error)
        return res.status(HttpStatus.BAD_REQUEST).send({ error: error });
      return res.status(HttpStatus.OK).send({ data: data });
    } catch (error) {
      return { error: error };
    }
  }

  @Get(':brandId/addons/:addonId')
  async getAddon(
    @Response() res: any,
    @Param('brandId') brandId: number,
    @Param('addonId') addonId: number,
  ) {
    try {
      const payload = { brandId, addonId };
      const { error, data } = await this.brandsService.getAddon(payload);
      if (error)
        return res
          .status(error.statusCode || HttpStatus.BAD_REQUEST)
          .send({ error: error });

      return res.status(HttpStatus.OK).send({ data: data });
    } catch (error) {
      console.log('lop', error);
      return res.status(HttpStatus.BAD_GATEWAY).send({ error });
    }
  }

  @Post()
  async create(@Response() res: any, @Body() createBrandDto: CreateBrandDto) {
    try {
      console.log(createBrandDto);
      const { error, data } = await this.brandsService.create(createBrandDto);
      if (error) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error });
      }

      return res.status(HttpStatus.CREATED).send({ data });
    } catch (error) {
      return res.status(HttpStatus.BAD_GATEWAY).send({ error });
    }
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}

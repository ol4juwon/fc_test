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
  Logger,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAddonDto } from 'src/addons/dto/create-addon.dto';
import { UpdateAddonDto } from 'src/addons/dto/update-addon.dto';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { updateAddon } from 'src/types';
import { Role } from 'src/users/model/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
@Controller('brands')
export class BrandsController {
  private readonly logger = new Logger(BrandsController.name);
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

  @Post(':brandId/addon-categories')
  async addCat(
    @Response() res: any,
    @Param('brandId') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      createCategoryDto.brands_id = id;
      const { error, data } = await this.brandsService.createCategory(
        createCategoryDto,
      );
      if (error) return res.status(HttpStatus.BAD_REQUEST).send({ error });
      return res.status(HttpStatus.CREATED).send({ data });
    } catch (e) {
      return res.status(HttpStatus.BAD_GATEWAY).send({ error: e });
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
      return res.status(HttpStatus.BAD_GATEWAY).send({ error });
    }
  }

  @Post()
  async create(@Response() res: any, @Body() createBrandDto: CreateBrandDto) {
    try {
      this.logger.debug(createBrandDto);
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
  findAll(@Response() res, @Query() query) {
    return this.brandsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':brandId/addons/:addonId')
  async updateAddons(
    @Response() res: any,
    @Param('brandId') brands_id: number,
    @Param('addonId') addonId: number,
    @Body() updateBrandDto: updateAddon['payload'],
  ) {
    try {
      const payload: updateAddon = {
        brands_id,
        addonId,
        payload: updateBrandDto,
      };
      const { error, data } = await this.brandsService.updateAddons(payload);
      if (error) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: error.sqlMessage || error, status: false });
      }

      return res.status(HttpStatus.OK).send({ data, status: true });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_GATEWAY)
        .send({ error: error.sqlMessage, status: false });
    }
  }

  @Patch(':brandId')
  async update(
    @Response() res: any,
    @Param('brandId') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    try {
      const { error, data } = await this.brandsService.update(
        id,
        updateBrandDto,
      );
      if (error) {
        return res
          .status(error.statusCode || HttpStatus.BAD_REQUEST)
          .send({ error: error.sqlMessage || error });
      }

      return res.status(HttpStatus.CREATED).send({ data });
    } catch (error) {
      return res.status(HttpStatus.BAD_GATEWAY).send({ error });
    }
  }

  @Delete(':brandId/addons/:addonId')
  async removeAddon(
    @Response() res: any,
    @Param('brandId') brands_id: number,
    @Param('addonId') addonId: number,
  ) {
    try {
      const { error, data } = await this.brandsService.removeAddon({
        brandId: brands_id,
        addonId,
      });
      if (error) return res.status(HttpStatus.BAD_REQUEST).send({ error });
      return res.status(HttpStatus.ACCEPTED).send({ data });
    } catch (error) {
      return res.status(HttpStatus.BAD_GATEWAY).send({ error });
    }
  }
}

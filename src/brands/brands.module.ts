import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { AddonsService } from 'src/addons/addons.service';
import { ObjectionModule } from 'nestjs-objection/dist';
import { Brand } from './model/brand.model';
import { Addon } from 'src/addons/model/addon.model';
import { Category } from 'src/category/model/category.model';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, AddonsService, CategoryService],
  imports: [ObjectionModule.forFeature([Brand, Addon, Category])],
})
export class BrandsModule {}

import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { AddonsService } from 'src/addons/addons.service';
import { ObjectionModule } from 'nestjs-objection/dist';
import { Brand } from './model/brand.model';
import { Addon } from 'src/addons/model/addon.model';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, AddonsService],
  imports: [ObjectionModule.forFeature([Brand, Addon])],
})
export class BrandsModule {}

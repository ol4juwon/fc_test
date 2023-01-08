import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ObjectionModule } from 'nestjs-objection/dist';
import { Category } from './model/category.model';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [ObjectionModule.forFeature([Category])],
})
export class CategoryModule {}

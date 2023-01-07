import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Category } from 'src/category/model/category.model';

export class CreateAddonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsPositive()
  brands_id: number;

  @IsArray()
  @IsOptional()
  category: Category[];
}

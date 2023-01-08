import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  brands_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

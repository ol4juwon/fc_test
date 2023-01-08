import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

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

  @IsString()
  @IsOptional()
  category: string;
}

import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { VehicleCondition } from '../../../../domain/entities/outbound/vehicle.entity';
import { CursorPaginatorDto } from './cursor-paginator.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchVehiclesDto extends CursorPaginatorDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly brand?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly model?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(VehicleCondition, { message: 'Please set "NEW" or "USED"' })
  readonly condition?: VehicleCondition;
}

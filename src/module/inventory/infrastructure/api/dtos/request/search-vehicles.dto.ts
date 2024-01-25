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

export class SearchVehiclesDto extends CursorPaginatorDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly brand?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly model?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly location?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly year?: number;

  @IsOptional()
  @IsEnum(VehicleCondition, { message: 'Please set "NEW" or "USED"' })
  readonly condition?: VehicleCondition;
}

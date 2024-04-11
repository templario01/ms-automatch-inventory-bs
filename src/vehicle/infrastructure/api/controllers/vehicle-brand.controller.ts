import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleBrandUseCase } from '../../../application/vehicle-brand.use-case';
import { BrandDto } from '../dtos/response/brand.dto';
import { ValidateWordPipe } from '../pipes/validate-word.pipe';

@ApiTags('Brands')
@Controller('brands')
export class VehicleBrandController {
  constructor(private readonly vehicleBrandUseCase: VehicleBrandUseCase) {}
  @Get('search')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicle brands',
  })
  getBrands(@Query('word', ValidateWordPipe) word: string): BrandDto[] {
    return this.vehicleBrandUseCase.getFilteredBrands(word);
  }
}

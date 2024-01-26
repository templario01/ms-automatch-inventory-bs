import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandsUseCase } from '../../../application/brans.use-case';
import { BrandDto } from '../dtos/response/brand.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsUseCase: BrandsUseCase) {}
  @Get('search')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicle brands',
  })
  getBrands(@Query('word') word: string): BrandDto[] {
    return this.brandsUseCase.getFilteredBrands(word);
  }
}

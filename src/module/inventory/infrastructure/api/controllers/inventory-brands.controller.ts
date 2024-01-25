import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class InventoryBrandsController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicle brands',
  })
  async getBrands(@Query() word: any): Promise<any[]> {
    return [word];
  }
}

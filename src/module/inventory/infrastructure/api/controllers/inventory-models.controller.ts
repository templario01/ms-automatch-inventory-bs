import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Models')
@Controller('models')
export class InventoryModelsController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicle models for a specific brand',
  })
  async getBrands(@Param('brandId') brandId: string): Promise<any[]> {
    return [brandId];
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { InventoryUseCase } from '../../../application/inventory.use-case';
import { ExtractIdsPipe } from '../pipes/extract-ids.pipe';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchVehiclesDto } from '../dtos/request/search-vehicles.dto';
import { VehicleDto } from '../dtos/response/vehicle.dto';
import { PaginatedVehiclesDto } from '../dtos/response/paginated-vehicles';
import { ExtractSearchesPipe } from '../pipes/extract-searches.pipe';
import { UserSearchDto } from '../dtos/request/user-search.dto';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryUseCase: InventoryUseCase) {}

  @Get('search')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicles paginated',
    type: PaginatedVehiclesDto,
  })
  async searchVehicles(
    @Query() searchVehiclesDto: SearchVehiclesDto,
  ): Promise<PaginatedVehiclesDto> {
    return this.inventoryUseCase.getFilteredVehicles(searchVehiclesDto);
  }

  @Get('group')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicles',
    type: [VehicleDto],
  })
  @ApiQuery({ name: 'ids', type: String })
  async getVehiclesByIds(
    @Query('ids', ExtractIdsPipe) vehicleIds: string[],
  ): Promise<VehicleDto[]> {
    return this.inventoryUseCase.getVehiclesByIds(vehicleIds);
  }

  @Get('recommended')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicles',
    type: [VehicleDto],
  })
  async getRecommendedVehicles(
    @Query('searches', ExtractSearchesPipe) searches: UserSearchDto[],
  ): Promise<VehicleDto[]> {
    return this.inventoryUseCase.getRecommendedVehicles(searches);
  }
}

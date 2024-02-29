import { Controller, Get, Query } from '@nestjs/common';
import { InventoryUseCase } from '../../../application/inventory.use-case';
import { ExtractIdsPipe } from '../../../../common/pipes/extract-ids.pipe';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchVehiclesDto } from '../dtos/request/search-vehicles.dto';
import { VehicleDto } from '../dtos/response/vehicle.dto';
import { PaginatedVehiclesDto } from '../dtos/response/paginated-vehicles';

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

  @Get('listing')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicles',
    type: [VehicleDto],
  })
  @ApiQuery({ name: 'ids', type: String })
  async getVehicleByIds(
    @Query('ids', ExtractIdsPipe) vehicleIds: string[],
  ): Promise<VehicleDto[]> {
    return this.inventoryUseCase.getVehiclesByIds(vehicleIds);
  }
}

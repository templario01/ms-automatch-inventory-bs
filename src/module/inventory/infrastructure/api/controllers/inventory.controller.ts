import { Controller, Get, Query } from '@nestjs/common';
import { InventoryUseCase } from '../../../application/inventory.use-case';
import { ExtractIdsPipe } from '../../../../../common/pipes/parse-string.pipe';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchVehiclesDto } from '../dtos/request/search-vehicles.dto';
import { VehicleDto } from '../dtos/response/vehicle.dto';
import { PaginatorDto } from '../dtos/response/paginator.dto';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryUseCase: InventoryUseCase) {}

  @Get('search')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicles paginated',
    type: PaginatorDto<VehicleDto>,
  })
  async searchVehicles(
    @Query() searchVehiclesDto: SearchVehiclesDto,
  ): Promise<PaginatorDto<VehicleDto>> {
    return this.inventoryUseCase.getFilteredVehicles(searchVehiclesDto);
  }

  @Get('listing')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of vehicles',
    type: [VehicleDto],
  })
  async getVehicleByIds(
    @Query('ids', ExtractIdsPipe) vehicleIds: string[],
  ): Promise<VehicleDto[]> {
    return this.inventoryUseCase.getVehiclesByIds(vehicleIds);
  }
}

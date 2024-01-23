import { Controller, Get, Param } from '@nestjs/common';
import { InventoryUseCase } from '../../../application/inventory.use-case';
import { ParseIdPipe } from '../../../../../common/pipes/parse-string.pipe';
import { VehicleResponseDto } from '../dtos/vehicle.response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryUseCase: InventoryUseCase) {}

  @Get()
  public async getVehicles() {
    return this.inventoryUseCase.findVehicles();
  }

  @Get('/:id')
  @ApiResponse({
    description: 'Returns a vehicle Object',
    type: VehicleResponseDto,
  })
  public async getVehicle(
    @Param('id', new ParseIdPipe()) id: string,
  ): Promise<VehicleResponseDto> {
    return this.inventoryUseCase.findVehicle(id);
  }
}

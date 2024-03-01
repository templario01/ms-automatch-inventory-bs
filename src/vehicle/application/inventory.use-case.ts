import { Injectable } from '@nestjs/common';
import { IInventoryRepository } from '../domain/repositories/inventory.repository';
import { Vehicle } from '../domain/entities/outbound/vehicle';
import { GetFilteredVehiclesInput } from '../domain/entities/inbound/get-filtered-vehicles-input';
import { CursorPaginator } from '../domain/entities/outbound/cursor-paginator';

@Injectable()
export class InventoryUseCase {
  constructor(private readonly inventoryRepository: IInventoryRepository) {}

  public async getFilteredVehicles(
    input: GetFilteredVehiclesInput,
  ): Promise<CursorPaginator<Vehicle>> {
    return this.inventoryRepository.getVehiclesBySearch(input);
  }
  public async getVehiclesByIds(vehicleIds: string[]): Promise<Vehicle[]> {
    return this.inventoryRepository.getVehiclesByIds(vehicleIds);
  }
}

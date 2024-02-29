import { Injectable } from '@nestjs/common';
import { InventoryRepository } from '../domain/repositories/inventory.repository';
import { Vehicle } from '../domain/entities/outbound/vehicle.entity';
import { SearchVehicles } from '../domain/entities/inbound/search-vehicles.entity';
import { Paginator } from '../domain/entities/outbound/paginator.entity';

@Injectable()
export class InventoryUseCase {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  public async getFilteredVehicles(
    input: SearchVehicles,
  ): Promise<Paginator<Vehicle>> {
    return this.inventoryRepository.getVehiclesBySearch(input);
  }
  public async getVehiclesByIds(vehicleIds: string[]): Promise<Vehicle[]> {
    return this.inventoryRepository.getVehiclesByIds(vehicleIds);
  }
}

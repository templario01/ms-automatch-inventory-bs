import { Injectable } from '@nestjs/common';
import { InventoryRepository } from '../domain/repositories/inventory.repository';
import { Vehicle } from '../domain/vehicle';

@Injectable()
export class InventoryUseCase {
  constructor(private readonly inventorRepository: InventoryRepository) {}

  public async findVehicles() {
    return this.inventorRepository.getVehicles();
  }
  public async findVehicle(id: string): Promise<Vehicle> {
    return this.inventorRepository.getVehicle(id);
  }
}

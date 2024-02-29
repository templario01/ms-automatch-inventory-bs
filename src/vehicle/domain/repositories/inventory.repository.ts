import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/outbound/vehicle.entity';
import { Paginator } from '../entities/outbound/paginator.entity';
import { SearchVehicles } from '../entities/inbound/search-vehicles.entity';

@Injectable()
export abstract class InventoryRepository {
  abstract getVehiclesBySearch(
    params: SearchVehicles,
  ): Promise<Paginator<Vehicle>>;
  abstract getVehiclesByIds(vehicleIds: string[]): Promise<Vehicle[]>;
}

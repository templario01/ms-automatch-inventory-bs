import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/outbound/vehicle';
import { CursorPaginator } from '../entities/outbound/cursor-paginator';
import { GetFilteredVehiclesInput } from '../entities/inbound/get-filtered-vehicles-input';
import { Search } from '../entities/inbound/search-input';

@Injectable()
export abstract class IInventoryRepository {
  abstract getVehiclesBySearch(
    params: GetFilteredVehiclesInput,
  ): Promise<CursorPaginator<Vehicle>>;
  abstract getVehiclesByIds(vehicleIds: string[]): Promise<Vehicle[]>;
  abstract getRecommendedVehicles(data: Search[]): Promise<Vehicle[]>;
}

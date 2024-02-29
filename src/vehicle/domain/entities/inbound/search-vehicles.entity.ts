import { VehicleCondition } from '../outbound/vehicle.entity';
import { GetVehiclesPaginator } from './get-vehicles-paginator.entity';

export class SearchVehicles extends GetVehiclesPaginator {
  readonly brand?: string;
  readonly model?: string;
  readonly location?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly year?: number;
  readonly condition?: VehicleCondition;
}

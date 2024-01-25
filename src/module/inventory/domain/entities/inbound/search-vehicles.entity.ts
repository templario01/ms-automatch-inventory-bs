import { VehicleCondition } from '../outbound/vehicle.entity';
import { CursorPaginator } from './cursor-paginator.entity';

export class SearchVehicles extends CursorPaginator {
  readonly brand?: string;
  readonly model?: string;
  readonly location?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly year?: number;
  readonly condition?: VehicleCondition;
}

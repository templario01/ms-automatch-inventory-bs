import { VehicleCondition } from '../outbound/vehicle';
import { GetVehiclesPaginatorInput } from './get-vehicles-paginator-input';

export class GetFilteredVehiclesInput extends GetVehiclesPaginatorInput {
  readonly brand?: string;
  readonly model?: string;
  readonly location?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly year?: number;
  readonly condition?: VehicleCondition;
}

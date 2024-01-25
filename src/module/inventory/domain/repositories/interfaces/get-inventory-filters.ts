import { IPrismaVehicleInput } from './prisma-vehicle.interface';

export class IGetInventoryFilters {
  readonly take?: number;
  readonly after?: string;
  readonly where?: IPrismaVehicleInput;
  readonly hasOrderBy?: boolean;
}

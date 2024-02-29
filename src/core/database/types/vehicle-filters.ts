import { PrismaVehicleInput } from './prisma.vehicle';

export type GetInventoryFilters = {
  readonly take?: number;
  readonly after?: string;
  readonly where?: PrismaVehicleInput;
  readonly hasOrderBy?: boolean;
};

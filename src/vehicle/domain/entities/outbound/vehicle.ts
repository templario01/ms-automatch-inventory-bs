import { Vehicle as PrismaVehicle } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CursorPaginator } from './cursor-paginator';
import { IPaginatedResponse } from '../../../../core/common/types/paginator.interface';

export enum VehicleCondition {
  NEW = 'NEW',
  USED = 'USED',
}

export enum VehiclePriceCurrency {
  PEN = 'PEN',
  USD = 'USD',
}

export enum VehicleListingStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class Vehicle {
  readonly id: string;
  readonly name?: string;
  readonly externalId: string;
  readonly url: string;
  readonly description: string;
  readonly year: number;
  readonly transmission: string;
  readonly mileage: number;
  readonly frontImage: string;
  readonly images: string;
  readonly location: string;
  readonly condition: VehicleCondition;
  readonly originalPrice: number;
  readonly price: number;
  readonly currency: VehiclePriceCurrency;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly websiteId: string;
  readonly status: VehicleListingStatus;

  static prismaToEntity(data: PrismaVehicle): Vehicle {
    return plainToInstance(Vehicle, {
      ...data,
      condition: VehicleCondition[data.condition],
      status: VehicleListingStatus[data.status],
      currency: VehiclePriceCurrency[data.currency],
    });
  }

  static prismaToEntities(data: PrismaVehicle[]): Vehicle[] {
    return data.map((vehicle) => Vehicle.prismaToEntity(vehicle));
  }

  static paginate(data: IPaginatedResponse<Vehicle>): CursorPaginator<Vehicle> {
    return plainToInstance(CursorPaginator<Vehicle>, {
      ...data,
    });
  }
}

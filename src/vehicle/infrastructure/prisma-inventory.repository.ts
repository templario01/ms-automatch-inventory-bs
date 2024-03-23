import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { IInventoryRepository } from '../domain/repositories/inventory.repository';
import { Vehicle as PrismaVehicle } from '@prisma/client';
import { IEdgeType } from '../../core/common/types/paginator.interface';
import { CursorPaginator } from '../domain/entities/outbound/cursor-paginator';
import { PrismaVehicleInput } from '../../core/database/types/prisma.vehicle';
import { GetFilteredVehiclesInput } from '../domain/entities/inbound/get-filtered-vehicles-input';
import {
  Vehicle,
  VehicleCondition,
  VehicleListingStatus,
} from '../domain/entities/outbound/vehicle';
import { GetInventoryFilters } from '../../core/database/types/vehicle-filters';

@Injectable()
export class PrismaInventoryRepository implements IInventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getVehiclesByIds(vehicleIds: string[]): Promise<Vehicle[]> {
    const prismaVehicles: Awaited<PrismaVehicle[]> =
      await this.prisma.vehicle.findMany({
        where: { id: { in: [...vehicleIds] } },
      });

    if (!prismaVehicles || prismaVehicles.length === 0) {
      throw new NotFoundException('Resource not found');
    }

    return Vehicle.prismaToEntities(prismaVehicles);
  }

  public getVehiclesBySearch(
    params: GetFilteredVehiclesInput,
  ): Promise<CursorPaginator<Vehicle>> {
    const { brand, model, location, minPrice, maxPrice, year, condition } =
      params;

    const whereFilter = {
      AND: [
        this.buildOnlyActiveVehiclesFilter(),
        this.buildNameFilter(brand, model),
        this.buildYearFilter(year),
        this.buildLocationFilter(location),
        this.buildConditionFilter(condition),
        this.buildPriceFilter(minPrice, maxPrice),
      ],
    };

    return this.getVehiclesByPrismaFilter({ ...params, where: whereFilter });
  }

  private async getVehiclesByPrismaFilter(
    params: GetInventoryFilters,
  ): Promise<CursorPaginator<Vehicle>> {
    const { take, after, where, hasOrderBy = true } = params;
    const totalCount: Awaited<number> = await this.prisma.vehicle.count({
      where,
    });
    const vehicles: Awaited<PrismaVehicle[]> =
      await this.prisma.vehicle.findMany({
        where,
        take: typeof take === 'number' ? take + 1 : undefined,
        skip: after ? 1 : undefined,
        cursor: after ? { id: after } : undefined,
        orderBy: hasOrderBy ? [{ price: 'asc' }] : [],
      });

    const results = Vehicle.prismaToEntities(vehicles);

    const hasNextPage =
      typeof take === 'number' ? results.length > take : false;
    if (hasNextPage) results.pop();

    const lastItem = results[results?.length - 1];
    const endCursor = lastItem?.id;
    const edges = results.map<IEdgeType<Vehicle>>((vehicle) => ({
      cursor: vehicle.id,
      node: vehicle,
    }));

    return Vehicle.paginate({
      nodes: results,
      edges,
      hasNextPage,
      endCursor,
      totalCount,
    });
  }

  private buildConditionFilter(
    condition?: VehicleCondition,
  ): PrismaVehicleInput {
    return condition
      ? { condition: { equals: VehicleCondition[condition] } }
      : {};
  }

  private buildLocationFilter(location?: string): PrismaVehicleInput {
    return location
      ? {
          location: {
            contains: location,
            mode: 'insensitive',
          },
        }
      : {};
  }

  private buildPriceFilter(
    minPrice: number,
    maxPrice: number,
  ): PrismaVehicleInput {
    if (minPrice && !maxPrice) {
      return { price: { gte: minPrice } };
    }
    if (maxPrice && !minPrice) {
      return { price: { lte: maxPrice } };
    }
    if (minPrice && maxPrice) {
      return { price: { gte: minPrice, lte: maxPrice } };
    }

    return {};
  }

  private buildYearFilter(year?: number): PrismaVehicleInput {
    return year ? { year: { equals: year } } : {};
  }

  private buildNameFilter(brand?: string, model?: string): PrismaVehicleInput {
    if (brand && !model) {
      return {
        name: {
          contains: brand,
          mode: 'insensitive',
        },
      };
    }
    if (model && !brand) {
      return {
        name: {
          contains: model,
          mode: 'insensitive',
        },
      };
    }

    if (brand && model) {
      return {
        AND: [
          {
            name: { contains: brand, mode: 'insensitive' },
          },
          {
            name: { contains: model, mode: 'insensitive' },
          },
        ],
      };
    }

    return {};
  }

  private buildOnlyActiveVehiclesFilter(): PrismaVehicleInput {
    return {
      status: VehicleListingStatus.ACTIVE,
    };
  }
}

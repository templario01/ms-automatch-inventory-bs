import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { InventoryRepository } from '../../domain/repositories/inventory.repository';
import { Vehicle as PrismaVehicle } from '@prisma/client';
import { Vehicle } from '../../domain/vehicle';

@Injectable()
export class PrismaInventoryRepository implements InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getVehicles() {
    return [];
  }

  public async getVehicle(id: string): Promise<Vehicle> {
    try {
      const prismaVehicle: Awaited<PrismaVehicle> =
        await this.prisma.vehicle.findUnique({
          where: { id },
        });

      if (!prismaVehicle) {
        throw new NotFoundException('Resource not found');
      }

      return Vehicle.prismaToEntity(prismaVehicle);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
}

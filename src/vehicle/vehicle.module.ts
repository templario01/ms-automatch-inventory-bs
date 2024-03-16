import { Module } from '@nestjs/common';
import { InventoryController } from './infrastructure/api/controllers/inventory.controller';
import { IInventoryRepository } from './domain/repositories/inventory.repository';
import { PrismaInventoryRepository } from './infrastructure/prisma-inventory.repository';
import { InventoryUseCase } from './application/inventory.use-case';
import { PrismaModule } from '../core/database/prisma.module';
import { VehicleBrandController } from './infrastructure/api/controllers/vehicle-brand.controller';
import { IBrandRepository } from './domain/repositories/brand.repository';
import { PrismaBrandRepository } from './infrastructure/prisma-brand.repository';
import { VehicleBrandUseCase } from './application/vehicle-brand.use-case';

const useCases = [InventoryUseCase, VehicleBrandUseCase];
const repositories = [
  { provide: IInventoryRepository, useClass: PrismaInventoryRepository },
  { provide: IBrandRepository, useClass: PrismaBrandRepository },
];

@Module({
  imports: [PrismaModule],
  controllers: [InventoryController, VehicleBrandController],
  providers: [...useCases, ...repositories],
})
export class InventoryModule {}

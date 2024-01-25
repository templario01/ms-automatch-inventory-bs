import { Module } from '@nestjs/common';
import { InventoryController } from './api/controllers/inventory.controller';
import { InventoryRepository } from '../domain/repositories/inventory.repository';
import { PrismaInventoryRepository } from './persistence/prisma.inventory.repository';
import { InventoryUseCase } from '../application/inventory.use-case';
import { PrismaModule } from './database/prisma.module';
import { InventoryBrandsController } from './api/controllers/inventory-brands.controller';
import { InventoryModelsController } from './api/controllers/inventory-models.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    InventoryController,
    InventoryBrandsController,
    InventoryModelsController,
  ],
  providers: [
    { provide: InventoryRepository, useClass: PrismaInventoryRepository },
    InventoryUseCase,
  ],
})
export class InventoryModule {}

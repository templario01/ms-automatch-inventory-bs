import { Module } from '@nestjs/common';
import { InventoryController } from './api/controllers/inventory.controller';
import { InventoryRepository } from '../domain/repositories/inventory.repository';
import { PrismaInventoryRepository } from './persistence/prisma.inventory.repository';
import { InventoryUseCase } from '../application/inventory.use-case';
import { PrismaModule } from './database/prisma.module';
import { BrandsController } from './api/controllers/brands.controller';
import { BrandsRepository } from '../domain/repositories/brands.repository';
import { LocalBrandsRepository } from './persistence/local.brands.repository';
import { BrandsUseCase } from '../application/brans.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryController, BrandsController],
  providers: [
    { provide: InventoryRepository, useClass: PrismaInventoryRepository },
    { provide: BrandsRepository, useClass: LocalBrandsRepository },
    InventoryUseCase,
    BrandsUseCase,
  ],
})
export class InventoryModule {}

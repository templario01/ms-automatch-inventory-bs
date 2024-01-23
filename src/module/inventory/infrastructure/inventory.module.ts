import { Module } from '@nestjs/common';
import { InventoryController } from './api/controllers/inventory.controller';
import { InventoryRepository } from '../domain/repositories/inventory.repository';
import { PrismaInventoryRepository } from './persistence/prisma.inventory.repository';
import { InventoryUseCase } from '../application/inventory.use-case';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryController],
  providers: [
    { provide: InventoryRepository, useClass: PrismaInventoryRepository },
    InventoryUseCase,
  ],
})
export class InventoryModule {}

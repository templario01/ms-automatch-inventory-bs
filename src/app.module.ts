import { Module } from '@nestjs/common';
import { InventoryModule } from './module/inventory/infrastructure/inventory.module';

@Module({
  imports: [InventoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { InventoryModule } from './module/inventory/infrastructure/inventory.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvSettings, envSettings } from './config/env.settings';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<EnvSettings>(envSettings),
      envFilePath: '.env',
    }),
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

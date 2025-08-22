import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { EnvConfigModule } from '../settings/env-config.module';

@Module({
  imports: [CacheModule.register(), EnvConfigModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

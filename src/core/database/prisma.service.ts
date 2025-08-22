import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { cacheReadsExtension } from './cache/cache-extensions';
import { EnvConfigService } from '../settings/env-config.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly envConfigService: EnvConfigService,
  ) {
    super({
      log: process.env.NODE_ENV !== 'test' ? ['query', 'info'] : [],
    });
    const extended = this.$extends(
      cacheReadsExtension(
        this.cacheManager,
        this.envConfigService.app.prismaCacheTtlInMinutes * 60000,
      ),
    );
    Object.assign(this, extended);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

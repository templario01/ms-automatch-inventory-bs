import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { cacheReadsExtension } from './cache/cache-extensions';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super({
      log: process.env.NODE_ENV !== 'test' ? ['query', 'info'] : [],
    });
    const extended = this.$extends(
      cacheReadsExtension(this.cacheManager, 600000),
    ); // TTL = 120s
    Object.assign(this, extended);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

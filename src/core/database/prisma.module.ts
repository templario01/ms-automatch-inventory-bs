import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

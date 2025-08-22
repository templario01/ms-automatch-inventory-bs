import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  get app() {
    return {
      port: this.configService.get<number>('PORT'),
      environment: this.configService.get<string>('NODE_ENV'),
      prismaCacheTtlInMinutes: this.configService.get<number>(
        'PRISMA_CACHE_TTL_IN_MINUTES',
        1,
      ),
    };
  }
}

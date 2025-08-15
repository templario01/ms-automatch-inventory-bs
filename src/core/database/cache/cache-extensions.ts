import { Prisma } from '@prisma/client';
import { Cache } from 'cache-manager';

export function cacheReadsExtension(cacheManager: Cache, defaultTTL = 60) {
  return Prisma.defineExtension({
    name: 'cacheReads',
    query: {
      $allModels: {
        async findUnique({ args, query, model }) {
          return handleCachedRead(
            model,
            'findUnique',
            args,
            query,
            cacheManager,
            defaultTTL,
          );
        },
        async findFirst({ args, query, model }) {
          return handleCachedRead(
            model,
            'findFirst',
            args,
            query,
            cacheManager,
            defaultTTL,
          );
        },
        async findMany({ args, query, model }) {
          return handleCachedRead(
            model,
            'findMany',
            args,
            query,
            cacheManager,
            defaultTTL,
          );
        },
        async aggregate({ args, query, model }) {
          return handleCachedRead(
            model,
            'aggregate',
            args,
            query,
            cacheManager,
            defaultTTL,
          );
        },
        async count({ args, query, model }) {
          return handleCachedRead(
            model,
            'count',
            args,
            query,
            cacheManager,
            defaultTTL,
          );
        },
      },
    },
  });
}

async function handleCachedRead(
  model: string,
  op: string,
  args: any,
  query: any,
  cacheManager: Cache,
  defaultTTL: number,
) {
  const key = `${model}:${op}:${JSON.stringify(args)}`;
  const cached = await cacheManager.get(key);

  if (cached !== undefined) {
    return cached;
  }

  const result = await query(args);
  await cacheManager.set(key, result, defaultTTL);
  return result;
}

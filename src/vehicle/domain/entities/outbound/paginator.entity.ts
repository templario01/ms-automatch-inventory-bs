import { IEdgeType } from '../../repositories/interfaces/pagination.interface';

export class Paginator<T> {
  readonly edges: IEdgeType<T>[];
  readonly nodes: T[];
  readonly totalCount: number;
  readonly hasNextPage: boolean;
  readonly endCursor?: string;
}

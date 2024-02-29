import { IEdgeType } from '../../../../core/common/types/paginator.interface';

export class CursorPaginator<T> {
  readonly edges: IEdgeType<T>[];
  readonly nodes: T[];
  readonly totalCount: number;
  readonly hasNextPage: boolean;
  readonly endCursor?: string;
}

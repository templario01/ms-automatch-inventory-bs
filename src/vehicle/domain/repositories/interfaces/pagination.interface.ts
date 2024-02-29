export interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedResponse<T> {
  edges: IEdgeType<T>[];
  nodes: T[];
  hasNextPage: boolean;
  endCursor?: string;
  totalCount: number;
}

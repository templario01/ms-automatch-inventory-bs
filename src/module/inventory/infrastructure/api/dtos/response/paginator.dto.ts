import {
  ApiAcceptedResponse,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IEdgeType } from '../../../../domain/repositories/interfaces/pagination.interface';

@ApiAcceptedResponse()
export class PaginatorDto<T> {
  @ApiProperty()
  readonly edges: IEdgeType<T>[];

  @ApiProperty()
  readonly nodes: T[];

  @ApiProperty()
  readonly totalCount: number;

  @ApiProperty()
  readonly hasNextPage: boolean;

  @ApiPropertyOptional()
  readonly endCursor?: string;
}

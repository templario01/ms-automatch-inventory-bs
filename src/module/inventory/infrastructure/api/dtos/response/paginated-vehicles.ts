import {
  ApiAcceptedResponse,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { VehicleDto } from './vehicle.dto';

@ApiAcceptedResponse()
export class VehicleEdge {
  @ApiProperty()
  readonly cursor: string;

  @ApiProperty({ type: VehicleDto })
  readonly node: VehicleDto;
}

@ApiAcceptedResponse()
export class PaginatedVehiclesDto {
  @ApiProperty({ type: [VehicleEdge] })
  readonly edges: VehicleEdge[];

  @ApiProperty({ type: [VehicleDto] })
  readonly nodes: VehicleDto[];

  @ApiProperty()
  readonly totalCount: number;

  @ApiProperty()
  readonly hasNextPage: boolean;

  @ApiPropertyOptional()
  readonly endCursor?: string;
}

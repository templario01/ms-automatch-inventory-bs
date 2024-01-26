import { ApiAcceptedResponse, ApiProperty } from '@nestjs/swagger';

@ApiAcceptedResponse()
export class BrandDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly models: string[];
}

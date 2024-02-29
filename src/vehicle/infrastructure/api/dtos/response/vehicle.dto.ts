import { ApiAcceptedResponse, ApiProperty } from '@nestjs/swagger';
import { VehicleCondition } from '../../../../domain/entities/outbound/vehicle';

@ApiAcceptedResponse()
export class VehicleDto {
  @ApiProperty({
    description: 'vehicle Id',
    example: '65aeef8c8e4565258e33316e',
  })
  readonly id: string;

  @ApiProperty({ description: 'vehicle external Id', example: '1769006' })
  readonly externalId: string;

  @ApiProperty({
    description: 'vehicle listing url',
    example:
      'https://neoauto.com/https://neoauto.com/auto/usado/jeep-grand-cherokee-laredo-2014-1768933',
  })
  readonly url: string;

  @ApiProperty({
    description: 'vehicle name',
    example: 'jeep grand cherokee laredo 2014',
  })
  readonly name?: string;

  @ApiProperty({
    description: 'vehicle description',
    example: 'VERSION LAREDO 4X4, SERVICIOS Y GARANTIA DIVEMOTOR',
    required: false,
  })
  readonly description?: string;

  @ApiProperty({ description: 'vehicle year', example: '2014' })
  readonly year: number;

  @ApiProperty({
    description: 'vehicle transmission',
    example: 'manual',
    required: false,
  })
  readonly transmission?: string;

  @ApiProperty({ description: 'vehicle mileage in Km.', example: '87300' })
  readonly mileage: number;

  @ApiProperty({
    description: 'vehicle primary image url',
    example:
      'https://cde.neoauto.pe/autos_usados/196x165/470963/470963_7714863.webp',
  })
  readonly frontImage: string;

  @ApiProperty({
    description: 'vehicle images',
    example:
      'https://cde.neoauto.pe/autos_usados/196x165/470963/470963_7714863.webp,https://cde.neoauto.pe/autos_usados/196x165/470963/470963_7714863.webp',
    required: false,
  })
  readonly images?: string;

  @ApiProperty({ description: 'vehicle location', example: 'Lima, Lima' })
  readonly location: string;

  @ApiProperty({
    description: 'vehicle condition',
    enum: ['NEW', 'USED'],
    example: ' USED',
  })
  readonly condition: VehicleCondition;

  @ApiProperty({ description: 'vehicle original price', example: '17900' })
  readonly originalPrice: number;

  @ApiProperty({ description: 'vehicle price in USD', example: '17900' })
  readonly price: number;

  @ApiProperty({
    description: 'vehicle listing currency',
    enum: ['USD', 'PEN'],
    example: 'USD',
  })
  readonly currency: 'PEN' | 'USD';

  @ApiProperty({
    description: 'vehicle creation date',
    example: '2024-01-22T22:43:39.640+00:00',
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'vehicle last sync date',
    example: '2024-01-22T22:43:39.640+00:00',
  })
  readonly updatedAt: Date;

  @ApiProperty({
    description: 'vehicle website Id',
    example: '65aee7ba3b3f8d4313a259e4',
  })
  readonly websiteId: string;

  @ApiProperty({
    description: 'vehicle status',
    enum: ['ACTIVE', 'INACTIVE'],
    example: 'ACTIVE',
  })
  readonly status: 'ACTIVE' | 'INACTIVE';
}

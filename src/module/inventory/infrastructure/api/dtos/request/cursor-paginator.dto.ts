import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CursorPaginatorDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly take: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly after?: string;
}

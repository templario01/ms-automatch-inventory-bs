import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { UserSearchDto } from '../dtos/request/user-search.dto';

export type SearchesPayload = {
  readonly data: UserSearchDto[];
};

@Injectable()
export class ExtractSearchesPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`Query param is missing "?searches="`);
    }
    try {
      const searches: SearchesPayload = JSON.parse(
        Buffer.from(value, 'base64').toString('ascii'),
      );
      return searches.data;
    } catch (error) {
      throw new BadRequestException(
        'Query param "searches" have invalid payload value',
      );
    }
  }
}

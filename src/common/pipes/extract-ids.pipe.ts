import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isEmpty } from 'class-validator';

@Injectable()
export class ExtractIdsPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException(`Query param is missing "?ids="`);
    return value?.split(',').map((id) => {
      if (isEmpty(id) || !ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid query param value: "${id}"`);
      }
      return id;
    });
  }
}

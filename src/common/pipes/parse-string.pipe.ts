import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isEmpty } from 'class-validator';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (isEmpty(value) || !ObjectId.isValid(value)) {
      throw new BadRequestException(`Invalid Param ID structure: "${value}"`);
    }

    return value;
  }
}

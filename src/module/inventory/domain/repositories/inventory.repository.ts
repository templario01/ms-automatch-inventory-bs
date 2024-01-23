import { Injectable } from '@nestjs/common';
import { Vehicle } from '../vehicle';

@Injectable()
export abstract class InventoryRepository {
  abstract getVehicles(): any;
  abstract getVehicle(id: string): Promise<Vehicle>;
}

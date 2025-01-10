import { HttpException, HttpStatus } from '@nestjs/common';

export class DeliveryNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Delivery with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

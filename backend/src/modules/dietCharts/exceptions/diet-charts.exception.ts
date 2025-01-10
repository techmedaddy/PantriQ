import { HttpException, HttpStatus } from '@nestjs/common';

export class DietChartNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Diet chart with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class PatientNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Patient with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

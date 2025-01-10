import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsString()
  patientId!: string;

  @IsNotEmpty()
  @IsString()
  mealBoxId!: string;

  @IsNotEmpty()
  @IsString()
  assignedTo!: string;

  @IsNotEmpty()
  @IsString()
  deliveryTime!: string;
}

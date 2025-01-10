import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  diseases?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsNotEmpty()
  @IsNumber()
  roomNumber!: number;

  @IsNotEmpty()
  @IsNumber()
  bedNumber!: number;

  @IsOptional()
  @IsNumber()
  floorNumber?: number;

  @IsNotEmpty()
  @IsNumber()
  age!: number;

  @IsNotEmpty()
  @IsString()
  gender!: string;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;
}

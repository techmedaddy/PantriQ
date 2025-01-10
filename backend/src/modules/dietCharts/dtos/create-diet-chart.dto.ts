import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateDietChartDto {
  @IsNotEmpty()
  @IsString()
  patientId!: string;

  @IsOptional()
  @IsString()
  morningMeal?: string;

  @IsOptional()
  @IsString()
  afternoonMeal?: string;

  @IsOptional()
  @IsString()
  eveningMeal?: string;

  @IsOptional()
  @IsString()
  instructions?: string;
}

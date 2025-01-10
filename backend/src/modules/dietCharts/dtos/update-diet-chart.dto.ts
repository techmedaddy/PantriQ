import { PartialType } from '@nestjs/mapped-types';
import { CreateDietChartDto } from './create-diet-chart.dto';

export class UpdateDietChartDto extends PartialType(CreateDietChartDto) {}

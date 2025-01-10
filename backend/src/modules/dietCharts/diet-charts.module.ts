import { Module } from '@nestjs/common';
import { DietChartsController } from './diet-charts.controller';
import { DietChartsService } from './diet-charts.service';

@Module({
  controllers: [DietChartsController],
  providers: [DietChartsService],
})
export class DietChartsModule {}

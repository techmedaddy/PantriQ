import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDietChartDto } from './dtos/create-diet-chart.dto';
import { UpdateDietChartDto } from './dtos/update-diet-chart.dto';

@Injectable()
export class DietChartsService {
  private dietCharts: Array<CreateDietChartDto & { id: number }> = []; // Temporary in-memory store (replace with a database)

  async create(createDietChartDto: CreateDietChartDto) {
    const newDietChart = { id: this.dietCharts.length + 1, ...createDietChartDto };
    this.dietCharts.push(newDietChart);
    return newDietChart;
  }

  async findAll() {
    return this.dietCharts;
  }

  async findOne(id: string) {
    const dietChart = this.dietCharts.find((chart) => chart.id === Number(id));
    if (!dietChart) {
      throw new NotFoundException(`Diet chart with ID ${id} not found`);
    }
    return dietChart;
  }

  async update(id: string, updateDietChartDto: UpdateDietChartDto) {
    const dietChartIndex = this.dietCharts.findIndex((chart) => chart.id === Number(id));
    if (dietChartIndex === -1) {
      throw new NotFoundException(`Diet chart with ID ${id} not found`);
    }
    this.dietCharts[dietChartIndex] = {
      ...this.dietCharts[dietChartIndex],
      ...updateDietChartDto,
    };
    return this.dietCharts[dietChartIndex];
  }

  async remove(id: string) {
    const dietChartIndex = this.dietCharts.findIndex((chart) => chart.id === Number(id));
    if (dietChartIndex === -1) {
      throw new NotFoundException(`Diet chart with ID ${id} not found`);
    }
    const removedDietChart = this.dietCharts.splice(dietChartIndex, 1);
    return { message: `Diet chart with ID ${id} removed`, dietChart: removedDietChart[0] };
  }
}

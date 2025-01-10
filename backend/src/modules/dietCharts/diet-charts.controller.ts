import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { DietChartsService } from './diet-charts.service';
import { CreateDietChartDto } from './dtos/create-diet-chart.dto';
import { UpdateDietChartDto } from './dtos/update-diet-chart.dto';

@Controller('diet-charts')
export class DietChartsController {
  constructor(private readonly dietChartsService: DietChartsService) {}

  @Post()
  async create(@Body() createDietChartDto: CreateDietChartDto) {
    return await this.dietChartsService.create(createDietChartDto);
  }

  @Get()
  async findAll() {
    return await this.dietChartsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dietChartsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDietChartDto: UpdateDietChartDto) {
    return await this.dietChartsService.update(id, updateDietChartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dietChartsService.remove(id);
  }
}

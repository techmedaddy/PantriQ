import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
import { UpdateDeliveryDto } from './dtos/update-delivery.dto';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  async create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return await this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  async findAll() {
    return await this.deliveriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.deliveriesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return await this.deliveriesService.update(id, updateDeliveryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deliveriesService.remove(id);
  }
}

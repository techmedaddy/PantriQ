import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
import { UpdateDeliveryDto } from './dtos/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  private deliveries: Array<{ id: number; status: string; [key: string]: any }> = []; // Temporary in-memory storage (replace with a database)

  async create(createDeliveryDto: CreateDeliveryDto) {
    const newDelivery = { id: this.deliveries.length + 1, ...createDeliveryDto, status: 'Pending' };
    this.deliveries.push(newDelivery);
    return newDelivery;
  }

  async findAll() {
    return this.deliveries;
  }

  async findOne(id: string) {
    const delivery = this.deliveries.find((d) => d.id === Number(id));
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return delivery;
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    const deliveryIndex = this.deliveries.findIndex((d) => d.id === Number(id));
    if (deliveryIndex === -1) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    this.deliveries[deliveryIndex] = { ...this.deliveries[deliveryIndex], ...updateDeliveryDto };
    return this.deliveries[deliveryIndex];
  }

  async remove(id: string) {
    const deliveryIndex = this.deliveries.findIndex((d) => d.id === Number(id));
    if (deliveryIndex === -1) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    const removedDelivery = this.deliveries.splice(deliveryIndex, 1);
    return { message: `Delivery with ID ${id} removed`, delivery: removedDelivery[0] };
  }
}

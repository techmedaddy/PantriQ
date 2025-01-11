import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../kafka.service';
import { EachMessagePayload } from 'kafkajs';

@Injectable()
export class ExampleConsumer implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    await this.kafkaService.createConsumer(
      'example-group',
      'example-topic',
      async (payload: EachMessagePayload) => {
        const message = payload.message.value?.toString();
        console.log('Received message:', message);
        // Add your processing logic here
      },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { KafkaService } from '../kafka.service';

@Injectable()
export class ExampleProducer {
  constructor(private readonly kafkaService: KafkaService) {}

  async sendExampleMessage() {
    const message = { id: 1, content: 'Hello, Kafka!' };
    await this.kafkaService.sendMessage('example-topic', message);
  }
}

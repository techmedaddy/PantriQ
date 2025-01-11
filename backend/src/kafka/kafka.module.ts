import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ExampleConsumer } from './consumers/example.consumer';
import { ExampleProducer } from './producers/example.producer';

@Module({
  providers: [KafkaService, ExampleConsumer, ExampleProducer],
  exports: [KafkaService],
})
export class KafkaModule {}

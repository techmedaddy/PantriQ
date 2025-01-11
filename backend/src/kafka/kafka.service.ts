import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumers: Consumer[] = [];

  constructor() {
    this.kafka = new Kafka({
      clientId: 'pantriq-client',
      brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
    });

    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
    console.log('Kafka Producer connected');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    console.log('Kafka Producer disconnected');
  }

  async sendMessage(topic: string, message: string | object) {
    const formattedMessage =
      typeof message === 'string' ? { value: message } : { value: JSON.stringify(message) };

    await this.producer.send({
      topic,
      messages: [formattedMessage],
    });

    console.log(`Message sent to topic "${topic}":`, message);
  }

  async createConsumer(groupId: string, topic: string, onMessage: (payload: EachMessagePayload) => Promise<void>) {
    const consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({ eachMessage: onMessage });
    this.consumers.push(consumer);
    console.log(`Kafka Consumer subscribed to topic "${topic}" with groupId "${groupId}"`);
  }
}

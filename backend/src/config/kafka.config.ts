export const KafkaConfig = {
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  clientId: process.env.KAFKA_CLIENT_ID || 'pantriq-client',
  groupId: process.env.KAFKA_GROUP_ID || 'pantriq-group',
};

import { Connection } from 'mongoose';
import { SubscriberSchema } from './subscriber-schema';

export const SubscriberProviders = [
  {
    provide: 'SUBSCRIBER_MODEL',
    useFactory: (connection: Connection) => connection.model('Subscriber', SubscriberSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
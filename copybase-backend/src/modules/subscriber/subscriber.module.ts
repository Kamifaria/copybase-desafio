import { Module } from '@nestjs/common';
import { AppController } from '../../app.controller';
import { SubscriberService } from './service/subscriber-service';
import { SubscriberProviders } from './schemas/subscriber-provider';
import { DatabaseModule } from '../../database/database.module';
import { SubscriberController } from './controller/subscriber.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SubscriberController],
  providers: [
    SubscriberService,
    ...SubscriberProviders,
  ],
})
export class SubscriberModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SubscriberModule} from './modules/subscriber/subscriber.module'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SubscriberModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

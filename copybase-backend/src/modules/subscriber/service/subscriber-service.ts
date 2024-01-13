import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Subscriber } from '../model/subscriber-model';
import { CreateSubscriberDto } from '../dto/create-subscriber-dto';

@Injectable()
export class SubscriberService {
  constructor(
    @Inject('SUBSCRIBER_MODEL')
    private subscriberModel: Model<Subscriber>,
  ) {}

  async create(subscriber: CreateSubscriberDto): Promise<Subscriber> {
    const createdSubscriber = new this.subscriberModel(subscriber);
    return createdSubscriber.save();
  }

  async findAll(): Promise<Subscriber[]> {
    return this.subscriberModel.find().exec();
  }
}
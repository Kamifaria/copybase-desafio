import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateSubscriberDto } from '../dto/create-subscriber-dto';
import { SubscriberService } from '../service/subscriber-service';
import { Subscriber } from '../model/subscriber-model';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubscriberFactory } from '../adapter/subscriber-factory';
import { CsvSubsCriberStrategy } from '../adapter/executers/csv-subscriber-strategy';
import { XlsxSubsCriberStrategy } from '../adapter/executers/xlsx-subscriber-strategy';

@Controller('subscriber')
export class SubscriberController {

  private readonly subscriberFactory: SubscriberFactory = new SubscriberFactory(
    new CsvSubsCriberStrategy(),
    new XlsxSubsCriberStrategy()
    // TODO Criar o Strategy para carregar como csv tambem
  )

  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const subscribers = await this.subscriberFactory.getRunner(file.mimetype).execute(file)


    for (const subscriber of subscribers) {
      await this.subscriberService.create(subscriber);
    }

    return { message: "All Data loaded With Sucess"}
  }

  @Get()
  async findAll(): Promise<Subscriber[]> {
    return this.subscriberService.findAll();
  }
}
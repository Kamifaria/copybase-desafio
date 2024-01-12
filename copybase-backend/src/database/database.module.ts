import { Module } from '@nestjs/common';
import { databaseProviders } from './provider/mongoose';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD
      }),
  },

];
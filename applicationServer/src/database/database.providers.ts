import path from 'path';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@src/constants';

const databaseProvider = {
  provide: DATA_SOURCE,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [path.join(__dirname, '../**/*.entity.{ts,js}')],
      synchronize: false,
    });
    return dataSource.initialize();
  },
};

export { databaseProvider };

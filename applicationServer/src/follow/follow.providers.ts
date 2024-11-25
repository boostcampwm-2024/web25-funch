import { DataSource } from 'typeorm';
import { Follow } from '@follow/follow.entity';
import { FOLLOW_REPOSITORY } from '@src/constants';

export const followProvider = {
  provide: FOLLOW_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Follow),
  inject: [DataSource],
};

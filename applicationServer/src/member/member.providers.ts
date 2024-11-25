import { DataSource } from 'typeorm';
import { Member } from '@member/member.entity';
import { MEMBER_REPOSITORY } from '@src/constants';

const memberProvider = {
  provide: MEMBER_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
  inject: [DataSource],
};

export { memberProvider };

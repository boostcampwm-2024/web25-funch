import { DataSource } from 'typeorm';
import { Member } from '@member/member.entity';
import { MEMBER_REPOSITORY, DATA_SOURCE } from '@src/constants';

const memberProviders = [
  {
    provide: MEMBER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
    inject: [DATA_SOURCE],
  },
];

export { memberProviders };

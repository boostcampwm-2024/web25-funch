import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { memberProviders } from '@member/member.providers';
import { MemberService } from '@member/member.service';

@Module({
  imports: [DatabaseModule],
  providers: [...memberProviders, MemberService],
})
export class MemberModule {}

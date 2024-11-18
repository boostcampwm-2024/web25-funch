import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { memberProviders } from '@member/member.providers';
import { MemberController } from '@member/member.controller';
import { MemberService } from '@member/member.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [...memberProviders, MemberService],
  exports: [MemberService],
})
export class MemberModule {}

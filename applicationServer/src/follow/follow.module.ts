import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { followProvider } from '@follow/follow.providers';
import { FollowController } from '@follow/follow.controller';
import { FollowService } from '@follow/follow.service';
import { AuthModule } from '@src/auth/core/auth.module';
import { MemberModule } from '@src/member/member.module';

@Module({
  imports: [DatabaseModule, AuthModule, MemberModule],
  controllers: [FollowController],
  providers: [followProvider, FollowService],
  exports: [FollowService],
})
export class FollowModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { followProvider } from '@follow/follow.providers';
import { FollowController } from '@follow/follow.controller';
import { FollowService } from '@follow/follow.service';
import { AuthModule } from '@src/auth/core/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [FollowController],
  providers: [followProvider, FollowService],
  exports: [FollowService],
})
export class FollowModule {}

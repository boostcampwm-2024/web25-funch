import { Module } from '@nestjs/common';
import { LiveModule } from '@live/live.module';
import { MemberModule } from '@src/member/member.module';
import { SearchController } from '@search/search.controller';
import { SearchService } from '@search/search.service';
import { RedisService } from '@database/redis.service';

@Module({
  imports: [MemberModule, LiveModule],
  controllers: [SearchController],
  providers: [SearchService, RedisService],
})
export class SearchModule {}

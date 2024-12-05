import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from '@search/search.service';
import { LiveService } from '@src/live/live.service';
import { RedisService } from '@database/redis.service';
import { REDIS_LIVE_KEY } from '@src/constants';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly liveService: LiveService,
    private readonly redisService: RedisService,
  ) {}

  @Get('/')
  async getSearchData(@Query('query') query: string) {
    const keyword = query.replace(' ', '');
    const searchResult = {
      lives: [],
      members: [],
    };

    await Promise.all([
      (searchResult.lives = await this.searchService.getLiveListWithKeyword(keyword)),
      this.searchService.getMemberListWithKeyword(keyword).then(async (result) => {
        for (const thisUser of result) {
          if (!(await this.redisService.exists(`${REDIS_LIVE_KEY}${thisUser.broadcast_id}`)))
            searchResult.members.push(thisUser);
        }
      }),
    ]);

    return searchResult;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { LiveService } from '@src/live/live.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly liveService: LiveService,
  ) {}

  @Get('/')
  async getSearchData(@Query('query') query: string) {
    const keyword = query.replace(' ', '');
    const searchResult = {
      lives: [],
      members: [],
    };
    await Promise.all([
      (searchResult.lives = this.searchService.getLiveListWithKeyword(keyword)),
      (searchResult.members = (await this.searchService.getMemberListWithKeyword(keyword)).reduce(
        (offline, thisUser) => {
          if (!this.liveService.live.data.has(thisUser.broadcast_id)) offline.push(thisUser);
          return offline;
        },
        [],
      )),
    ]);

    return searchResult;
  }
}

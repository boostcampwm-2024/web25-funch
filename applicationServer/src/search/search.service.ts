import { Injectable } from '@nestjs/common';
import { MemberService } from '@src/member/member.service';
import { LiveService } from '@src/live/live.service';
import { Like } from 'typeorm';
import { User } from '@src/types';

@Injectable()
export class SearchService {
  constructor(
    private readonly memberService: MemberService,
    private readonly liveService: LiveService,
  ) {}

  async getLiveListWithKeyword(keyword) {
    const currentLiveList = await this.liveService.getLiveList(0);
    const filteredLiveList = currentLiveList.reduce((list, live) => {
      const metadata = [...live.tags, live.contentCategory, live.moodCategory, live.title, live.userName]
        .join('')
        .replace(' ', '');
      if (metadata.match(new RegExp(keyword))) list.push(live);
      return list;
    }, []);

    return filteredLiveList;
  }

  async getMemberListWithKeyword(keyword) {
    const condition = { name: Like(`%${keyword}%`) };
    const searchMemberList = await this.memberService.findMembersWithCondition(condition);

    return searchMemberList.map((member) => {
      return {
        name: member.name,
        profile_image: member.profile_image,
        broadcast_id: member.broadcast_id,
        follower_count: member.follower_count,
      } as User;
    });
  }
}

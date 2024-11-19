import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MemberService } from '@src/member/member.service';
import { Broadcast } from '@src/types';

@Injectable()
class LiveInterceptor implements NestInterceptor {
  constructor(private readonly memberService: MemberService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      mergeMap(async (data) => {
        if (Array.isArray(data)) {
          return Promise.all(
            data.map(async (live: Broadcast) => {
              const member = await this.memberService.findOneMemberWithCondition({ broadcast_id: live.broadcastId });
              return { ...live, name: member.name, profileImage: member.profile_image };
            }),
          );
        }
        return data;
      }),
    );
  }
}

export function AddMemberInfoToLive() {
  return UseInterceptors(LiveInterceptor);
}

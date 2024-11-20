import { Module } from '@nestjs/common';
import { LiveService } from '@live/live.service';
import { LiveController } from '@live/live.controller';
import { MemberModule } from '@src/member/member.module';
import { AuthModule } from '@src/auth/core/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MemberModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}

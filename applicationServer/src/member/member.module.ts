import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { memberProvider } from '@member/member.providers';
import { MemberController } from '@member/member.controller';
import { MemberService } from '@member/member.service';
import { AuthModule } from '@src/auth/core/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [MemberController],
  providers: [memberProvider, MemberService],
  exports: [memberProvider, MemberService],
})
export class MemberModule {}

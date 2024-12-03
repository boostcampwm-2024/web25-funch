import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REDIS_REFRESH_TOKEN_EXPIRE } from '@src/constants';
import { RedisService } from '@database/redis.service';

@Injectable()
class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  generateAccessToken(memberId: string) {
    return this.jwtService.sign({ memberId }, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });
  }

  generateRefreshToken(memberId: string) {
    return this.jwtService.sign({ memberId }, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE });
  }

  verifyToken(token: string) {
    if (!token) return false;
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException(`Token이 유효하지 않습니다 : ${error}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async saveRefreshToken(memberId: string, token: string) {
    await this.redisService.set(memberId, token, REDIS_REFRESH_TOKEN_EXPIRE);
  }

  async getRefreshToken(memberId: string) {
    return await this.redisService.get(memberId);
  }
}

export { AuthService };

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REDIS_HOST, REDIS_PORT, REDIS_EXPIRE, REDIS_REFRESH_TOKEN_EXPIRE } from '@src/constants';
import { Redis } from 'ioredis';

@Injectable()
class AuthService {
  private readonly redis: Redis;

  constructor(private readonly jwtService: JwtService) {
    this.redis = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });
  }

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
    await this.redis.set(memberId, token, REDIS_EXPIRE, REDIS_REFRESH_TOKEN_EXPIRE);
  }

  async getRefreshToken(memberId: string) {
    return await this.redis.get(memberId);
  }
}

export { AuthService };

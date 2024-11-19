import dotenv from 'dotenv';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

dotenv.config();

@Injectable()
class AuthService {
  private readonly tokens = new Map<string, string>();

  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(memberId: string) {
    return this.jwtService.sign({ memberId });
  }

  generateRefreshToken(memberId: string) {
    return this.jwtService.sign({ memberId }, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE });
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }

  saveRefreshToken(memberId: string, token: string) {
    this.tokens.set(memberId, token);
  }

  getRefreshToken(memberId: string) {
    return this.tokens.get(memberId);
  }

  removeRefreshToken(memberId: string) {
    this.tokens.delete(memberId);
  }
}

export { AuthService };

import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_EXPIRE } from '@src/constants';

@Injectable()
class RedisService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });
  }

  async set(key: string, value: string, seconds?: number | string) {
    if (seconds) {
      await this.redis.set(key, value, REDIS_EXPIRE, seconds);
      return;
    }
    await this.redis.set(key, value);
  }

  async get(key: string) {
    return await this.redis.get(key);
  }

  async delete(key: string) {
    await this.redis.del(key);
  }
}

export { RedisService };

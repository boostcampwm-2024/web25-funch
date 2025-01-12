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

  async getMany(keys: string[]) {
    if (keys.length === 0) return keys;
    return await this.redis.mget(keys);
  }

  async getSetType(key) {
    return await this.redis.smembers(key);
  }

  async addSetType(key, value) {
    await this.redis.sadd(key, value);
  }

  async removeSetType(key, value) {
    return await this.redis.srem(key, value);
  }

  async delete(key: string) {
    await this.redis.del(key);
  }

  async exists(key) {
    return await this.redis.exists(key);
  }
}

export { RedisService };

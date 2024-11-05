import * as dotenv from 'dotenv';
import { beforeAll, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

dotenv.config({
  path: '.env.test',
});

beforeAll(async () => {
  const { server } = await import('./src/app/server/node');
  server.listen();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.clearAllMocks();
  cleanup();
});

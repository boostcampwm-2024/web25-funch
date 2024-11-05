import { setupServer } from 'msw/node';
import { handlers } from '@/app/server/handlers';

export const server = setupServer(...handlers);

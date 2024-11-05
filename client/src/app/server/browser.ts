import { setupWorker } from 'msw/browser';
import { handlers } from '@/app/server/handlers';

export const worker = setupWorker(...handlers);

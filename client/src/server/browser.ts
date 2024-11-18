import { setupWorker } from 'msw/browser';
import { handlers } from '@server/handlers';

export const worker = setupWorker(...handlers);

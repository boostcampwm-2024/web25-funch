export const initMocks = async () => {
  if (process.env.NODE_ENV === 'production') return;

  if (typeof window === 'undefined') {
    const { server } = await import('./node');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    await worker.start();
  }
};

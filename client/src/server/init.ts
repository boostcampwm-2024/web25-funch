export const initMocks = async () => {
  if (process.env.NODE_ENV === 'production') return;

  if (typeof window === 'undefined') {
    const { server } = await import('@server/node');
    server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    const { worker } = await import('@server/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
};

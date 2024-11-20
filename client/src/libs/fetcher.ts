import type { FetcherParams } from '@libs/internalTypes';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const fetcher = async <T>({ method, url, customOptions }: FetcherParams): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: {
      ...defaultHeaders,
      ...customOptions?.headers,
    },
    body: customOptions?.body ? JSON.stringify(customOptions.body) : undefined,
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('에러 아님');
  }

  const fetchResult = await response.json();

  return fetchResult;
};

export default fetcher;

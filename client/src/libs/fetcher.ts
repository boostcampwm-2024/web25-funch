import type { FetcherParams } from '@libs/internalTypes';
import { COOKIE_USER_KEY } from './constants';
import Cookies from 'js-cookie';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const fetcher = async <T>({ method, url, customOptions }: FetcherParams): Promise<T> => {
  let savedAccessToken: string | null = null;

  if (typeof window !== 'undefined') {
    const tokenOnCookie = Cookies.get(COOKIE_USER_KEY);
    if (tokenOnCookie) {
      savedAccessToken = tokenOnCookie;
    }
  }

  const headers = {
    ...defaultHeaders,
    ...customOptions?.headers,
  } as any;

  if (savedAccessToken) {
    headers['Authorization'] = `Bearer ${savedAccessToken}`;
  }

  const options: RequestInit = {
    method,
    headers: { ...headers },
    body: customOptions?.body ? JSON.stringify(customOptions.body) : undefined,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    if (response.status === 401) {
      // refresh token 패치 로직 추가하기
    }

    throw new Error('에러 아님');
  }

  const fetchResult = await response.json();

  return fetchResult;
};

export default fetcher;

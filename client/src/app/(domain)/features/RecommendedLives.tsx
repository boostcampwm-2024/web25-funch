import clsx from 'clsx';
import { mockedBroadcasts } from '@mocks/broadcasts';
import RecommendedLivesRenderer from './RecommendedLivesRenderer';
import { Suspense } from 'react';
import ErrorBoundary from '@components/ErrorBoundary';

const fetchData = async () => {
  if (process.env.NODE_ENV !== 'production') return mockedBroadcasts;

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${apiUrl}/live/list`);

  if (!response.ok) {
    throw new Error('라이브 목록을 불러오는데 실패했어요.');
  }

  const data = await response.json();

  return data;
};

const RecommendedLives = async () => {
  return (
    <div>
      <div className={clsx('mb-4 flex items-center justify-between')}>
        <h2 className={clsx('text-content-neutral-primary funch-bold20')}>이 방송 어때요?</h2>
      </div>
      <ErrorBoundary
        fallback={<p className="funch-bold16 text-content-neutral-strong">추천 목록을 불러올 수 없어요.</p>}
      >
        <Suspense fallback={<p className="funch-bold16 text-content-neutral-strong">추천 목록을 불러오고 있어요.</p>}>
          <RecommendedLivesFetcher />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const RecommendedLivesFetcher = async () => {
  const lives = await fetchData();

  return <RecommendedLivesRenderer lives={lives} />;
};

export default RecommendedLives;

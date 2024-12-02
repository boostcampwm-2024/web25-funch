'use client';

import clsx from 'clsx';
import RecommendedLivesRenderer from './RecommendedLivesRenderer';
import { Suspense } from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getLiveList } from '@libs/actions';
import { TANSTACK_QUERY_KEY } from '@libs/constants';

const RecommendedLives = () => {
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

const RecommendedLivesFetcher = () => {
  const { data: lives } = useSuspenseQuery({
    queryKey: [TANSTACK_QUERY_KEY.LIVE_LIST],
    queryFn: async () => await getLiveList(),
    refetchOnMount: true,
  });

  return <RecommendedLivesRenderer lives={lives} />;
};

export default RecommendedLives;

'use client';

import RecommendedLivesRenderer from './RecommendedLivesRenderer';
import ErrorBoundary from '@components/ErrorBoundary';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getLiveList } from '@libs/actions';
import { TANSTACK_QUERY_KEY } from '@libs/constants';

const RecommendedLives = () => {
  return (
    <ErrorBoundary fallback={<p className="funch-bold16 text-content-neutral-strong">추천 목록을 불러올 수 없어요.</p>}>
      <RecommendedLivesFetcher />
    </ErrorBoundary>
  );
};

const RecommendedLivesFetcher = () => {
  const { data: lives } = useSuspenseQuery({
    queryKey: [TANSTACK_QUERY_KEY.LIVE_LIST],
    queryFn: async () => await getLiveList(),
    staleTime: 1000 * 60,
  });

  return <RecommendedLivesRenderer lives={lives} />;
};

export default RecommendedLives;

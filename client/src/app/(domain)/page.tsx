import RecommendedLives from './features/RecommendedLives';
import FollowingLives from './features/FollowingLives';
import clsx from 'clsx';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <section className="min-h-home w-full px-7">
      <FollowingLives />
      <div>
        <div className={clsx('mb-4 flex items-center justify-between')}>
          <h2 className={clsx('text-content-neutral-primary funch-bold20')}>이 방송 어때요?</h2>
        </div>
        <Suspense fallback={<p className="funch-bold16 text-content-neutral-strong">추천 목록을 불러오고 있어요.</p>}>
          <RecommendedLives />
        </Suspense>
      </div>
    </section>
  );
};

export default HomePage;

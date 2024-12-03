import { Suspense } from 'react';
import StreamSetting from './features/StreamSetting';
import StudioGuideContainer from './features/StudioGuideContainer';
import StudioInfoSettingGuide from './features/StudioInfoSettingGuide';
import { type Metadata } from 'next';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: '스튜디오',
  description: '펀치에서 스트림 키를 발급받고 방송을 시작해보세요!',
};

const StudioPage = () => {
  return (
    <div className="min-h-home w-full p-10">
      <StreamSettingRenderer />
      <div className="mt-8 flex justify-center gap-8">
        <StudioGuideContainer />
        <StudioInfoSettingGuide />
      </div>
    </div>
  );
};

const StreamSettingRenderer = () => {
  return (
    <div className="bg-surface-neutral-strong mx-auto flex w-[70%] min-w-[40rem] max-w-[44rem] flex-col items-center rounded-lg p-4 shadow-xl">
      <div className="mb-3 w-full justify-start">
        <h3 className="funch-bold20 text-content-neutral-primary ml-2">스트림 설정</h3>
      </div>
      <div className="bg-surface-neutral-primary flex w-full flex-col items-center rounded-lg p-6">
        <Suspense fallback={<StreamSettingSkeleton />}>
          <StreamSetting />
        </Suspense>
      </div>
    </div>
  );
};

const StreamSettingSkeleton = () => {
  return (
    <>
      <div className="mb-4 grid w-full grid-cols-5">
        <div className="funch-bold16 text-content-neutral-primary col-span-1 flex items-center">스트림 URL</div>
        <div className="text-content-neutral-primary col-span-4 grid h-[2.4rem] grid-cols-6 items-center gap-2">
          <span className={clsx('col-span-4 h-full', 'bg-surface-neutral-strong animate-pulse rounded-md')} />
          <div className={clsx('col-span-2 h-full', 'bg-surface-brand-weak animate-pulse rounded-md')}></div>
        </div>
      </div>
      <div className="grid w-full grid-cols-5">
        <div className="funch-bold16 text-content-neutral-primary col-span-1 flex items-center">스트림 키</div>
        <div className="text-content-neutral-primary col-span-4 grid h-[2.4rem] grid-cols-6 items-center gap-2">
          <span className={clsx('col-span-4 h-full', 'bg-surface-neutral-strong animate-pulse rounded-md')} />
          <div className="col-span-2 grid h-full grid-cols-2 gap-2">
            <div className={clsx('h-full', 'bg-surface-brand-weak animate-pulse rounded-md')} />
            <div className={clsx('h-full', 'bg-surface-brand-base animate-pulse rounded-md')} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioPage;

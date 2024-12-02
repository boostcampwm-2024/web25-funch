import { Suspense } from 'react';
import StreamSettingContainer from './features/StreamSettingContainer';
import StudioGuideContainer from './features/StudioGuideContainer';
import StudioInfoSettingGuide from './features/StudioInfoSettingGuide';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스튜디오',
};

const StudioPage = () => {
  return (
    <div className="min-h-home flex w-full flex-col p-10">
      <Suspense fallback={<p>스트림 키 불러오는 중...</p>}>
        <StreamSettingContainer />
      </Suspense>
      <div className="mt-4 flex justify-center gap-8">
        <StudioGuideContainer />
        <StudioInfoSettingGuide />
      </div>
    </div>
  );
};

export default StudioPage;

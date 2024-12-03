import { type Metadata } from 'next';
import clsx from 'clsx';
import MyStudioController from './features/MyStudioController';
import MyStudioChatRenderer from './features/MyStudioChatRenderer';

export const metadata: Metadata = {
  title: '나의 스튜디오',
  description: '나의 펀치 스튜디오에서 시청자와 소통하세요!',
};

const StudioMyPage = () => {
  return (
    <div className={clsx('h-live-section mx-auto grid w-full max-w-[calc(48rem+20rem+4rem)] grid-cols-[1fr,20rem]')}>
      <MyStudioController />
      <MyStudioChatRenderer />
    </div>
  );
};

export default StudioMyPage;

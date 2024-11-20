import { type Metadata } from 'next';
import clsx from 'clsx';
import MyStudioChat from './features/MyStudioChat';
import MyStudioController from './features/MyStudioController';

export const metadata: Metadata = {
  title: '스튜디오',
};

const StudioMyPage = () => {
  return (
    <div className={clsx('mx-auto grid h-full w-full max-w-[calc(48rem+20rem+4rem)] grid-cols-[1fr,20rem] px-8')}>
      <MyStudioController />
      <MyStudioChat />
    </div>
  );
};

export default StudioMyPage;

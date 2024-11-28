import { type Metadata } from 'next';
import clsx from 'clsx';
import MyStudioChat from './features/MyStudioChat';
import MyStudioController from './features/MyStudioController';

export const metadata: Metadata = {
  title: '스튜디오',
};

const StudioMyPage = () => {
  return (
    <div
      className={clsx(
        'h-live-section mx-auto grid w-full max-w-[calc(48rem+20rem+4rem)] grid-cols-[1fr,20rem]',
        //'border-border-neutral-weak border-x',
      )}
    >
      <MyStudioController />
      <MyStudioChat />
    </div>
  );
};

export default StudioMyPage;

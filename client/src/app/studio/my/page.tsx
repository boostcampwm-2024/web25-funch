import clsx from 'clsx';

const StudioMyPage = () => {
  return (
    <div className={clsx('grid w-full grid-cols-[1fr,20rem] px-8')}>
      <section>
        <div className={clsx('pt-live-aspect-ratio relative w-full')}>
          <div className={clsx('bg-surface-static-black absolute left-0 top-0 h-full w-full')} />
        </div>
      </section>
      <section>채팅 영역</section>
    </div>
  );
};

export default StudioMyPage;

import FunchSvg from '@components/svgs/FunchSvg';
import clsx from 'clsx';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <div
        className={clsx(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'border-border-neutral-weak flex flex-col items-center rounded-lg border border-solid px-6 py-4 shadow-md',
        )}
      >
        <div className="funch-bold14 mb-0.5">
          <FunchSvg />
        </div>
        <p className="funch-medium16 text-content-neutral-base mb-2">존재하지 않는 페이지예요.</p>
        <Link
          className="funch-meta16 text-content-neutral-weak hover:text-content-neutral-base hover:bg-surface-neutral-strong rounded-md px-2 py-1.5"
          href={'/'}
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

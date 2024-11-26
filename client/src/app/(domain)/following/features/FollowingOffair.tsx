import clsx from 'clsx';
import type { User2 } from '@libs/internalTypes';
import Image from 'next/image';
import useFollowingLives from '@hooks/useFollowingLives';

const FollowingOffair = () => {
  const { isError, isLoading, offlines } = useFollowingLives();

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  return (
    <div className={clsx('w-full')}>
      <div className={clsx('mb-2 flex items-center justify-between')}>
        <h2 className={clsx('text-content-neutral-primary funch-bold20')}>오프라인</h2>
      </div>
      <OfflineItems offlines={offlines} />
    </div>
  );
};

const OfflineItems = ({ offlines }: { offlines: User2[] }) => {
  return (
    <div className="mb-4 flex w-full gap-4">
      {offlines.map((item, idx) => {
        return (
          <div className="flex" key={idx}>
            <div className="flex w-full flex-col items-center">
              <div className="border-surface-neutral-base rounded-full border-[.1875rem] hover:m-[-0.1375rem] hover:border-[.3125rem]">
                <Image src={item.profile_image} width={80} height={80} className="rounded-full" alt="profile" />
              </div>
              <p className="funch-bold14">{item.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowingOffair;

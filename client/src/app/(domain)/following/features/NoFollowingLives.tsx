import Image from 'next/image';
import clsx from 'clsx';
import noContents from '@assets/no_result.png';
import Link from 'next/link';

const COMPONENT_TYPE = {
  NOFOLLOW: 'NOFOLLOW' as const,
  NOLIVE: 'NOLIVE' as const,
};

type Props = {
  componentType: keyof typeof COMPONENT_TYPE;
  pathname: string;
};

const NoFollowingLives = ({ pathname, componentType }: Props) => {
  return (
    <div className={clsx('flex w-full flex-col p-4')}>
      <div className={clsx('mb-2 flex items-center justify-between')}>
        <h2 className={clsx('text-content-neutral-primary funch-bold20')}>팔로우 중인 방송</h2>
      </div>
      <div className={clsx('flex flex-col items-center')}>
        <Image src={noContents} alt="no-following-lives" width={200} height={200} />
        <p className={clsx('text-content-neutral-primary funch-medium16 mt-4')}>
          {componentType === 'NOFOLLOW' ? '팔로우 중인 방송이 없습니다.' : '라이브 중인 방송이 없습니다.'}
        </p>
        {componentType === 'NOFOLLOW' && pathname === '/following' && (
          <Link href="/">
            <button
              className={clsx(
                'bg-surface-brand-base funch-bold14',
                'text-content-static-white mt-4 w-40 rounded-lg p-3',
                'hover:opacity-75',
              )}
            >
              다른 방송 보러 가기
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NoFollowingLives;

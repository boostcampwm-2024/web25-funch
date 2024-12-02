import Image from 'next/image';
import clsx from 'clsx';
import noContents from '@assets/noContents.png';
import Link from 'next/link';

type Props = {
  componentType: 'noFollow' | 'noLive';
  pathname: string;
};

const NoFollowingLives = ({ pathname, componentType }: Props) => {
  return (
    <div className={clsx('flex w-full flex-col p-4')}>
      <div className={clsx('flex flex-col items-center')}>
        <Image src={noContents} alt="no-following-lives" width={250} height={250} />
        <p className={clsx('text-content-neutral-primary funch-bold16 mt-4')}>
          {componentType === 'noFollow' ? '팔로우 중인 방송이 없습니다.' : '라이브 중인 방송이 없습니다.'}
        </p>
        {componentType === 'noFollow' && pathname === '/following' && (
          <Link href="/">
            <button
              className={clsx(
                'bg-surface-brand-base funch-bold14',
                'text-content-neutral-inverse mt-4 w-40 rounded-lg p-3',
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

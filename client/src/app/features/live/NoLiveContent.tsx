'use client';

import Link from 'next/link';
import NotifySvg from '@components/svgs/NotifySvg';

const NoLiveContent = () => {
  return (
    <div className="min-h-home flex w-full flex-col items-center justify-center">
      <NotifySvg />
      <strong className="funch-bold20 text-surface-neutral-inverse my-2">존재하지 않는 채널입니다.</strong>
      <p className="funch-medium14 mb-4 text-center">
        지금 입력하신 주소의 페이지는
        <br />
        사라졌거나 다른 페이지로 변경되었습니다.
        <br />
        주소를 다시 확인해주세요.
      </p>
      <Link href="/" title="펀치 홈으로">
        <button className="bg-surface-static-warmgray hover:bg-surface-static-coolgray text-content-static-white funch-bold16 rounded-3xl px-4 py-2">
          다른 방송 보러가기
        </button>
      </Link>
    </div>
  );
};

export default NoLiveContent;

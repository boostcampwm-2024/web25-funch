import React from 'react';
import Link from 'next/link';

const StudioRouter = () => {
  return (
    <div className="text-content-neutral-primary">
      <Link href="/studio" className="mx-4">
        <strong className="funch-bold16">방송 설정</strong>
      </Link>
      <Link href="/studio/my">
        <strong className="funch-bold16">내 방송</strong>
      </Link>
    </div>
  );
};

export default StudioRouter;

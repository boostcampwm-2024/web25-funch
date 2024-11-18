import React from 'react';
import Link from 'next/link';

const StudioLogo = () => {
  return (
    <div className="text-content-neutral-primary flex items-center gap-1.5">
      <Link href="/" className="">
        <strong className="funch-bold24 text-content-brand-strong">FUNCH</strong>
      </Link>
      <Link href="/studio">
        <strong className="funch-bold24">STUDIO</strong>
      </Link>
    </div>
  );
};

export default StudioLogo;
